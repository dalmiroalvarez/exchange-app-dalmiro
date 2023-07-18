// Components
import Formulario from "./Formulario"

const Header = () => {
  return (
    <>
    <div className="w-full h-[60px] bg-blue-950 pl-8 py-4 text-white text-lg font-medium">
        Currency exchange
    </div>
    <div className="w-full h-[295px] bg-lightBluePrimary flex justify-center pt-12 text-white text-3xl font-medium">
  <p className="w-[60%] sm:w-[50%] text-center sm:text-center">100 EUR to USD - Convert Euros to US Dollars</p>
</div>


    <Formulario/>
    </>
  )
}

export default Header