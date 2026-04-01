import fs from "fs";
import multer from "multer";
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const user_id = req.user._id;
    const dir = "uploads/" + user_id;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    let filearr = file.originalname.split(".");
    let filext = filearr[filearr.length - 1];

    cb(null, Date.now() + "__." + filext);
  },
});
