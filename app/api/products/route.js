const dataList =[
    { "_id": "Gp2bAhzbNMVl9IVy1v3I", "stock": "11", "description": "meow con meow con", "price": "100000", "images": ["https://storage.googleapis.com/shop-384517.appspot.com/ProductImages/1683622135224_kitten.png"], "title": "kitten", "properties": { "color": "black" }, "category": "meow" },
    { "_id": "HBi9mRiwTxaU4nztoHfD", "stock": "13", "description": "puppy", "properties": { "smart": "true", "sad": "fasle" }, "title": "puppy puppy  puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy", "category": "minh", "price": "200000", "images": ["https://storage.googleapis.com/shop-384517.appspot.com/ProductImages/1683110883155_puppy.webp"] },
    { "_id": "IRqRecCc7JlX0OhNMvlp", "title": "iphone", "properties": { "color": "black", "series": "14", "size": "big" }, "images": [], "description": "iphone", "stock": "5", "category": "iphone", "price": "100000000" },
    { "_id": "aSsJt5eESW3mSAGzr5Eh", "stock": "20", "images": ["https://storage.googleapis.com/shop-384517.appspot.com/ProductImages/1687922249934_section_imageWithTextAndButton.jpg"], "category": "clothing", "price": "10", "description": "WHITE SOCK", "title": "SOCK", "properties": { "color": " yellow", "size": "large" } },
    { "_id": "hpPBQuvDBj9RXCCAeU3G", "title": "minh2", "stock": "21310", "description": "meh puppy puppy  puppy puppy puppy puppy puppy puppyppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppypuppy puppy  puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppypuppy puppy  puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppy puppypuppy puppy  puppy puppy puppy puppy ", "price": "300000", "images": ["https://storage.googleapis.com/shop-384517.appspot.com/ProductImages/1683477447348_puppy.webp"], "category": "minh3", "properties": { "height": "very tall", "smart": "true", "sad": "fasle" } },
]
function GetProduct(id){
    const product= dataList.find(product=>product._id===id);
    return product? product:'invalid'
}
export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (id){
        let res = await GetProduct(id)  
        return Response.json(res)
    } 
    else {
    let res = dataList
    return Response.json(res)
    }
}