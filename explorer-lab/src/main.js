import "./css/index.css"
import Imask, { MaskedDynamic } from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")





function setCardType(type) {
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
    applecard: ["#0E259E", "#8F0720"],
  }


  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)

}

setCardType("applecard")

const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
  mask: "0000"
}

const securityCodeMasked = Imask(securityCode, securityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
 const expirationDatePatterns = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: Imask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    },
    MM: {
      mask: Imask.MaskedRange,
      from: 1,
      to: 12
    }
  }
 }

 const expirationDateMasked = Imask(expirationDate, expirationDatePatterns)

 const cardNumber = document.querySelector("#card-number")
 const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard"
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default"
    },
  ],
  dispath: function(appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function(item){
      return number.match(item.regex)
    })

    console.log

    return foundMask
  }
 }
 const cardNumberMasked = Imask(cardNumber, cardNumberPattern)