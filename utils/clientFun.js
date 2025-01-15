export const shorterText = (text, maxCharacter) => {
  const t = String(text);
  if (t.length > maxCharacter) {
    return `${t.substring(0, maxCharacter)}...`;
  } else {
    return text;
  }
};

export const e2p = (s) => s?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export const p2e = (s) =>
  s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

export const sp = (number) => {
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber.join(",");
  return e2p(joinedNumber);
};

export const isInCart = (productId, selectedItems) => {
  if (selectedItems) {
    const existingIndex = selectedItems.findIndex((item) => item._id === productId);
    return existingIndex;
  } else {
    return -1;
  }
};

export const productQuantity = (productId, cartItems) => {
  if (!cartItems) return 0;
  const item = cartItems.find((item) => item.productId === productId);
  return item ? item.quantity : 0;
};

export const uploadCompressedFile = async (file) => {
  console.log("Uploading compressed file:", file);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  console.log("Cloud Name:", cloudName);
  console.log("Upload Preset:", uploadPreset);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Network response was not ok" + res.statusText);
    }

    const data = await res.json();
    return { fileUrl: data.secure_url };
  } catch (error) {
    console.error("Error uploading compressed file:", error);
    return { fileUrl: null };
  }
};
