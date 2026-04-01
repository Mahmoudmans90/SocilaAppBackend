import fs from "fs";
import User from "../models/User.model.js";

export const updataProfileService = async ({ file, user, body }) => {
  const userafterUpdate = await User.findOneAndUpdate(
    { _id: user._id },
    {
      profile_pic: file.destination + "/" + file.filename,
      ...body,
    },
  );
  if (fs.existsSync(userafterUpdate.profile_pic)) {
    fs.unlinkSync(userafterUpdate.profile_pic);
  }
  userafterUpdate.profile_pic = file.destination + "/" + file.filename;
  return userafterUpdate;
};
