import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");
 data.append("cloude_name", "dy89hlgq5");
  
  
  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dy89hlgq5/image/upload", data);
    const { url } = res.data || "http://res.cloudinary.com/dy89hlgq5/image/upload/v1713288331/gzrtnfxbdgthidfue08w.jpg";
    return url;
  } catch (err) {
    console.log(err,"cloudinary not working");
  }
};

export default upload;
