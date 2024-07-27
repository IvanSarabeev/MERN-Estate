import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import { InputOTP, InputOTPSlot, InputOTPGroup } from "components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "components/ui/button";
import { verifyOtpEmail } from "api/verifyOtp";
import { redirect } from "react-router-dom";
import { MdError } from "react-icons/md";
import { toast } from "components/ui/use-toast";
import { ToastAction } from "components/ui/toast";

type OtpDialogProps = {
  email: string;
  otp: string;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const OtpDialog: React.FunctionComponent<OtpDialogProps> = ({
  email,
  open,
  otp,
  setOtp,
  onOpenChange,
  error,
  setError,
  loading,
  setLoading,
}) => {
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleEmailVerification = async () => {
    setLoading(true);

    setError(null);

    try {
      const response = await verifyOtpEmail({ email, otp });

      if (response.success) {
        toast({
          title: "Code Verified",
          description: "Successfully verified OTP",
        });

        return redirect("/account");
      } else {
        throw new Error("Request failed!");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("Type error")) {
          setError("There was an issue with the type of the data provided.");
        } else if (err.message.includes("Runtime error")) {
          setError("A runtime error occurred. Please try again later.");
        } else if (err.message.includes("OTP expired")) {
          setError("Your OTP has expired. Please request a new one.");
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        toast({
          variant: "destructive",
          title: "OTP invalid",
          description: "There was a problem when proceeding",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });

        // Handle cases where err is not an instance of Error
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flexColCenter items-center">
          <DialogTitle className="regular-18 xl:bold-24">
            Verify Email
          </DialogTitle>
          <DialogDescription className="regular-16">
            We have sent you an email containing the key
          </DialogDescription>
        </DialogHeader>
        <div className="flexColCenter items-center space-x-2 mx-auto">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup>
              <InputOTPSlot className="font-semibold" index={0} />
              <InputOTPSlot className="font-semibold" index={1} />
              <InputOTPSlot className="font-semibold" index={2} />
              <InputOTPSlot className="font-semibold" index={3} />
              <InputOTPSlot className="font-semibold" index={4} />
              <InputOTPSlot className="font-semibold" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && (
          <span className="gap-x-2 flexCenter items-center mx-auto text-red-600">
            <span>
              <span className="sr-only">Error Icon</span>
              <MdError className="size-4" />
            </span>
            <p aria-label="error message"> {error} </p>
          </span>
        )}
        <DialogFooter className="gap-x-4 flexColCenter items-center mx-auto">
          <Button
            type="button"
            variant="secondary"
            onClick={handleEmailVerification}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Submit"}
          </Button>
          <DialogClose>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
