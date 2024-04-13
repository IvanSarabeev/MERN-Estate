import { useEffect, useState } from "react";
import { getUser } from "../services/apiUser";
import { CreateListingIntf } from "types/listing";
import { Link } from "react-router-dom";

type MessageModalProps = {
  listing: CreateListingIntf;
};

interface LandLordIntf {
  username: string;
  email: string;
}

const MessageModal = ({ listing }: MessageModalProps) => {
  const [landLord, setLandLord] = useState<LandLordIntf | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const handleLandLord = async () => {
      if (listing.userRef) {
        const data = await getUser({ listing });

        if (data) {
          setLandLord(data);
        }
      }
    };

    handleLandLord();
  }, [listing]);

  return (
    <>
      {landLord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landLord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name?.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={2}
            value={message}
            onChange={handleOnChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default MessageModal;
