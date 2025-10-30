export async function uploadImagesToCloudinary(files) {
  const cloudName = "ddvpnmium";
  const uploadPreset = "e-commerce-assets";
  const uploadedUrls = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      uploadedUrls.push(data.secure_url);
    } else {
      console.error("Cloudinary Error:", data);
      alert("❌ Cloudinary Upload Failed:\n" + data.error?.message);
    }
  }
  return uploadedUrls;
}
