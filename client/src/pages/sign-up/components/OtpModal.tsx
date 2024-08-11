import React, { memo } from "react";
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
import Logo from "assets/images/estate-logo.png";

type OtpModalProps = {
  email: string;
  otp: string;
  open: boolean;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const OtpModal: React.FunctionComponent<OtpModalProps> = ({
  email,
  open,
  otp,
  setOtp,
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
    // onOpenChange={handleModal}
    <Dialog open={open}>
      <DialogContent className="h-fit w-80 sm:w-96 md:w-[448px] space-y-2 rounded-lg">
        <DialogHeader className="flexColCenter items-center">
          <img
            src={Logo}
            alt="logo"
            decoding="async"
            loading="lazy"
            className="size-fit max-w-20 sm:max-w-24 md:max-w-28"
          />
          <DialogTitle className="regular-18 xl:bold-24">
            Verify Email
          </DialogTitle>
          <DialogDescription className="regular-16 max-w-sm text-balance text-center">
            Please check your email. We've sent you a one-time passcode (OTP) to
            verify your account.
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
        <DialogFooter className="gap-x-4 flex flex-row items-center justify-center mx-auto">
          <Button
            type="button"
            variant="primary"
            title="Verify Account"
            onClick={handleEmailVerification}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Submit"}
          </Button>
          <DialogClose
            type="button"
            title="Cancel Verification"
            aria-label="Close modal button"
            className="h-9 flexCenter px-4 py-2 rounded-md text-center border border-slate-200 bg-white shadow-sm hover:text-slate-900 hover:bg-red-500 hover:scale-105 transition-all ease-in-out duration-150"
          >
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MemoOtpModal = memo(OtpModal);

export default MemoOtpModal;
