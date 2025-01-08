// models/cryptoModel.js
import crypto from "crypto";

// Function to decrypt the encrypted text using AES
function decrypt(base64Data, key) {
    let encryptedData = base64Data.replace(/ /g, '+');
  // 1. Convert from Base64 to a raw buffer
  const data = Buffer.from(encryptedData, 'base64');
  
  // 2. The first 16 bytes are the IV
  const iv = data.slice(0, 16);
  
  // 3. The rest is the encrypted data
  const encryptedText = data.slice(16);

  // 4. Create a decipher using AES-256-CBC
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // 5. Decrypt and combine the result
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // 6. Remove PKCS#7 padding
  const paddingLength = decrypted[decrypted.length - 1];
  if (paddingLength > 0 && paddingLength <= 16) {
    decrypted = decrypted.slice(0, -paddingLength);
  }

  return decrypted.toString('utf8');
}

async function getVendorWithDishes(vendorId) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const vendorsCollection = db.collection('vendors');
    const dishesCollection = db.collection('dishes');

    // Validate if vendor exists
    const vendor = await vendorsCollection.findOne({ _id: new ObjectId(vendorId) });

    if (!vendor) {
      return { vendor: null, dishes: [] };
    }

    // Find dishes for the provided vendor ID
    const dishes = await dishesCollection.find({ vendorId: new ObjectId(vendorId) }).toArray();

    return { vendor, dishes };
  } catch (error) {
    console.error('Error in vendorModule:', error.message);
    throw error;
  } finally {
    await client.close();
  }
} 

export { decrypt, getVendorWithDishes };