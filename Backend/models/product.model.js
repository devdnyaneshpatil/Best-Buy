const mongoose=require("mongoose")

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    requiired: true,
  },
  description: {
    type: String,
    default:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque animi libero laudantium obcaecati molestiae, autem exercitationem at alias maxime tempora repellat. Possimus et doloremque ex dicta, sapiente repellendus necessitatibus. Eveniet asperiores fuga sint expedita soluta nemo eius qui, ipsa ad.",
  },
});

const ProductModel=mongoose.model('product',productSchema)

module.exports=ProductModel