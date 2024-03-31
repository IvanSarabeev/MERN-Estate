// import { UserSignUpData } from "types/user";
// import { app } from "../fireStore/firebase";
// import {
//     getDownloadURL,
//     getStorage,
//     ref,
//     // uploadBytes,
//     uploadBytesResumable,
//   } from "firebase/storage";

// interface UploadProps {
//     file: undefined | null,
//     formData: UserSignUpData,
//     setFormData: React.Dispatch<React.SetStateAction<UserSignUpData>>,
//     setFilePerc:  React.Dispatch<React.SetStateAction<number>>,
// }

// export const uploadFile = ({file, formData, setFilePerc, setFormData}: UploadProps) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;

//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on("state_changed", (snapshop) => {
//         const progress = (snapshop.bytesTransferred / snapshop.totalBytes) * 100;
//         // round the file
//         setFilePerc(Math.round(progress));
//       }),
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//           setFormData({
//             ...formData,
//             avatar: downloadURL,
//           })
//         );
//       };
// };