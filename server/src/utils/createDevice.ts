import device from '../models/device'

export async function createDevice(){
  const newDevice = new device({
    macAddress: 12,
    deviceID: 1234,
    type: 'anel'
  })
  
  try{
        await newDevice.save();
        console.log("device salvo");
    }
    catch(error){
    console.error('erro salvando:',error);
    }
}
