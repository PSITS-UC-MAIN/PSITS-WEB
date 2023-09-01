import useShoppingCart from "@/store/useShoppingCart";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ShoppingCart, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    removeFromCart
  } = useShoppingCart()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="relative">
          <ShoppingCart color="#fff" />
          <span
            className={
              cartItems.length < 1
                ? "absolute top-[-5px] end-[-5px] bg-red-600 text-white font-bold rounded-full p-1 text-[15px] px-3 hidden"
                : "absolute top-[-5px] end-[-5px] bg-red-600 text-white font-bold rounded-full p-1 text-[15px] px-3"
            }
          >
            {cartItems.length}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[85%] bg-[#f9f9f9]">
        <div className="flex flex-col mx-[3%]">
          <div className="grid grid-cols-6 text-center bg-[#254872] text-white rounded-md shadow-md p-5 mt-5 mb-5">
            <span>Product</span>
            <span>Size</span>
            <span>Color</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Action</span>
          </div>
          <ScrollArea className="h-[30em] w-full rounded-md">
            {cartItems.map((item: any) => (
              <div
                key={item._id}
                className="grid grid-cols-6 bg-white rounded-md shadow-md p-5 items-center mb-5"
              >
                <div className="flex flex-cols gap-x-5 items-center">
                  <img
                    src={item.photo_img_links[0]}
                    alt="Product Image"
                    className="w-[100px] h-[100px] rounded-md"
                  />
                  <span>{item.title}</span>
                </div>
                <span className="text-center">{item.size === "" ? "Not Specified" : item.size}</span>
                <span className="text-center">{item.color === "" ? "Not Specified" : item.color}</span>
                <span className="text-center">&#8369;{item.price}</span>
                <span className="text-center">{item.quantity}</span>
                <div className="flex flex-row justify-center">
                  <Button className="bg-red-600" onClick={() => removeFromCart(item)}>
                    <Trash size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex flex-row justify-end items-center gap-x-10 p-5">
            <span className="bg-white rounded-md py-2 px-5 shadow-md">
              Order Total:&emsp;&#8369;{totalPrice}
            </span>
            <Button type="submit" className="bg-[#268EA7] hover:bg-[#3da7c2]">
              Checkout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Cart;