import React, { useState } from "react";
import Layout from "components/Layouts/Layout";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../fireStore/firebase";
import { CreateListingIntf } from "types/listing";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const CreateListing: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<CreateListingIntf>({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    userRef: "",
    type: "sell",
    bedroom: 1,
    bathroom: 1,
    regularPrice: 50,
    discountPrice: 1,
    yearBuild: 1,
    rooms: 1,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState<string | boolean>(
    false
  );
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const storeImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, "Name/" + fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImagesSubmit = async () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
        console.log(files);
      }

      Promise.all(promises)
        .then((urls) => {
          const stringifyUrl = urls as string[];

          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(stringifyUrl),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Error occur while uploading images");
          setUploading(false);
          throw new Error(err);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id as "sell" | "rent",
      });
    }

    if (e.target.id === "parking" || e.target.id === "furnished") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checkValidity,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }
      // navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error);
      setLoading(false);
      throw new Error(JSON.stringify(error));
    }
  };

  return (
    <Layout>
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Create Listing
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="gap-4 xl:gap-12 grid grid-cols-1 lg:grid-cols-2 justify-center"
        >
          <div className="flex flex-1 flex-col gap-6">
            <Input
              id="name"
              type="text"
              required
              placeholder="Enter name"
              className="border p-3 rounded-lg"
              minLength={4}
              maxLength={60}
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              name="description"
              id="description"
              className="border p-3 rounded-lg"
              placeholder="Enter your description"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
            <Input
              type="text"
              id="address"
              name="address"
              required
              className="border p-3 rounded-lg"
              placeholder="Specify the property location"
              minLength={6}
              maxLength={30}
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex flex-wrap items-center justify-evenly">
              <div className="flex gap-2">
                <Input
                  id="sale"
                  name="sale"
                  className="size-5"
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.type === "sell"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="rent"
                  name="rent"
                  className="size-5"
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="parking"
                  name="parking"
                  className="size-5"
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="furnished"
                  name="furnished"
                  className="size-5"
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2 items-center">
                <Input
                  id="bedroom"
                  type="number"
                  min={1}
                  max={10}
                  required
                  onChange={handleChange}
                  value={formData.bedroom}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <label htmlFor="bedroom">Beds</label>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  id="regularPrice"
                  type="number"
                  min={1}
                  required
                  onChange={handleChange}
                  value={formData.regularPrice}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="bedroom">Regular price</label>
                  {formData.type === "rent" && (
                    <span className="regular-12 text-normal">$ per months</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  id="bathroom"
                  type="number"
                  min={1}
                  max={10}
                  required
                  onChange={handleChange}
                  value={formData.bathroom}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <label htmlFor="bathroom">Baths</label>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  id="discountPrice"
                  type="number"
                  min={1}
                  max={100000}
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="bedroom">Discount %</label>
                  {formData.type === "sell" && (
                    <span className="regular-12">discounted price</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-6">
            <p className="font-semibold regular-16">
              Images:
              <span className="regular-14 font-normal text-gray-700 ml-2">
                First image cover, total 6(max)
              </span>
            </p>
            <div className="gap-4 flex">
              <Input
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(Array.from(e.target.files)); // Convert FileList to an array
                  }
                }}
                id="images"
                type="file"
                accept="images/*"
                multiple
                className="w-fit lg:w-full p-3 border border-gray-300 rounded-lg"
              />
              <Button
                type="button"
                title="Upload Images"
                disabled={uploading}
                onClick={handleImagesSubmit}
                className="p-3 text-green-700 rounded-lg border border-green-400 uppercase bg-transparent hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading.." : "Upload"}
              </Button>
            </div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => {
                return (
                  <div
                    key={url}
                    className="flex items-center justify-between border p-3"
                  >
                    <img
                      src={url}
                      alt="listed images"
                      className="size-20 rounded-lg object-cover aspect-auto"
                    />
                    <Button
                      type="button"
                      title="Delete Image"
                      onClick={() => handleRemoveImage(index)}
                      className="p-2.5 rounded-lg regular-14 font-medium text-red-700 bg-red-400 transition-all ease-in-out hover:opacity-95 hover:scale-105"
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
            <Button
              type="submit"
              title="Create Listing"
              disabled={loading || uploading}
              className="p-3 capitalize text-white rounded-lg bg-slate-700 transition-all ease-in-out hover:opacity-95 disabled:opacity-80 hover:scale-105"
            >
              {loading ? "Creating..." : "Create listing"}
            </Button>
            {/* Removed the JSON.stringify */}
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default CreateListing;
