export function formShow() {
  const formCenter = document.querySelector(".form_center_menu");
  const overlay = document.querySelector(".overlay");
  const newItem = document.querySelector(".newItem");

  formCenter.addEventListener("click", function () {
    if (
      overlay.classList.contains("hidden") &&
      newItem.classList.contains("hidden")
    ) {
      overlay.classList.remove("hidden");
      newItem.classList.remove("hidden");
    } else {
      overlay.classList.add("hidden");
      newItem.classList.add("hidden");
    }
  });

  newItem.addEventListener("click", function (event) {
    event.stopPropagation();
  });
}
const fetchformShow = async () => {
  try {
    const response = await fetch("http://localhost:3004/centerMenu");
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    

    const newItemContainer = document.querySelector(".newItem");
    if (!newItemContainer) {
      console.error("newItem container not found");
      return;
    }

    let fetchform = "";
    if (data.inputs) {
      data.inputs.forEach((input) => {
        fetchform += `
          <input type="${input.type}" 
                 placeholder="${input.placeholder}" 
                 class="border-none outline-none font-[iranyekanmedium] text-[14px] text-[#9c9797] mx-5" />
          <hr class="w-[95%] mx-auto mt-[15px] mb-[20px] h-[2px] bg-[#df2a2a]" />
        `;
      });
    }
    if (data.images) {
      data.images.forEach((image) => {
        fetchform += `
          <img class="block w-[95%] shadow-md mx-auto" 
               src="${image.link}" 
               alt="${image.name}" />
        `;
      });
    }
    if (data.lastShop) {
      fetchform += `
        <div class="data-lastshop mx-[5%] mt-[5%] w-[100%] justify-center h-[48px] flex flex-row">
          <div class="svg-clock h-fit w-[7%]">
            <img src="${data.lastShop.svg}" alt="Clock Icon" />
          </div>
          <div class="w-[95%] h-fit font-[iranyekanmedium] text-[#424158] text-[14px]">
            ${data.lastShop.body}
          </div>
          <div class="svg-trash w-[20%] h-fit">
            <img src="${data.lastShop.trashSvg}" alt="Trash Icon" />
          </div>
        </div>
      `;
    }
    if (data.sliders && data.sliders[0]) {
      const slider1 = data.sliders[0];
      fetchform += `
        <div class="items-slider">
          <div class="swiper myslider slider-${slider1.title}">
            <div class="swiper-wrapper">
              ${slider1.items
                .map((item, index) => `<div class="swiper-slide">${item[`body${index + 1}`]}</div>`)
                .join("")}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
      `;
    }
    
    if (data.famousSearches) {
      fetchform += `
        <div class="famous mx-[5%] mt-[5%] w-[100%] justify-center h-[48px] flex flex-row">
          <div class="svg-fire h-fit w-[7%]">
            <img src="${data.famousSearches.svg}" alt="Fire Icon" />
          </div>
          <div class="w-[95%] h-fit font-[iranyekanmedium] text-[#424158] text-[14px]">
            ${data.famousSearches.body}
          </div>
        </div>
      `;
    }
    if (data.sliders && data.sliders.length > 1) {
      const slider2 = data.sliders[1];
      fetchform += `
        <div class="items-slider">
          <div class="swiper myslider slider-${slider2.title}">
            <div class="swiper-wrapper">
              ${slider2.items
                .map((item, index) => `<div class="swiper-slide">${item[`body${index + 6}`]}</div>`)
                .join("")}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
      `;
    }
    
    newItemContainer.innerHTML = fetchform;
    const sliders = document.querySelectorAll('.myslider');
sliders.forEach((swiperElement) => {
  new Swiper(swiperElement, {
    loop: true,
    slidesPerView: 3.5,  // نمایش 3.5 اسلاید به‌طور هم‌زمان
    spaceBetween: 15, 
    navigation: {
      nextEl: swiperElement.querySelector('.swiper-button-next'),
      prevEl: swiperElement.querySelector('.swiper-button-prev'),
    },
  });
});
    

  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

export default fetchformShow;

export const fetchLogin= async()=>{
  try{
let data=await fetch("http://localhost:3004/logincenter")
let res=await data.json()
if (!res || !Array.isArray(res)) {
  console.error("Invalid data structure received");
  return;
}
const logincenter=res.map((item)=>{
  return `<a href="./form.html" class="a_login_center_menu w-[160px] h-[40px] flex font-[iranyekanmedium] gap-x-[2px] justify-center items-center text-[12px] leading-[40px] text-center text-[#2b2b2b] border-[lightgrey] border-[1px] border-solid rounded-[12px] mx-auto">
              <img src="${item.svg1}" alt="login Icon" />
              ${item.body2}<span class="w-[2px] mx-[1px] rounded-[2px] h-[50%] bg-[#2b2b2b]">.</span>${item.body1}
              </a>
              <span class="devider w-[3px] h-[60%] mx-[3px] rounded-[2px]  bg-[#2b2b2b] ">.</span>
              `
})
document.querySelector(".login_center_menu").innerHTML=logincenter.join("")
  }catch(error){
    console.log(error.message)
  }
}
async function basketPage() {
  function setupEventListeners() {
    const basketicon = document.querySelector(".basketicon");
    const basketpage = document.querySelector(".basketpage");
    const subbasketpage = document.querySelector(".subbasketpage");

    if (basketicon && basketpage) {
      
      basketicon.addEventListener("mouseenter", function () {
        basketpage.classList.remove("hidden");
        basketpage.classList.add("block");
        subbasketpage.classList.remove("hidden");
        subbasketpage.classList.add("block");
      });
      basketpage.addEventListener("click", function () {
        basketpage.classList.add("hidden");
        basketpage.classList.remove("block");
        subbasketpage.classList.add("hidden");
        subbasketpage.classList.remove("block");
      });
      subbasketpage.addEventListener("click", function (e) {
        e.stopPropagation(); 
      });
    }
  }

  const checkInterval = setInterval(function() {
    setupEventListeners();
    if (document.querySelector(".basketicon") && document.querySelector(".basketpage")) {
      clearInterval(checkInterval);
    }
  }, 100);
}
basketPage()





const items = document.querySelectorAll(".swiper-slide-child");

items.forEach(item => {
  item.addEventListener("click", function() {
    const itemData = {
      img: item.getAttribute('data-img'),
      name: item.getAttribute('data-name'),
      price: item.getAttribute('data-price')
    };
    if (itemData.img && itemData.name && itemData.price) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const itemExists = cart.some(existingItem => existingItem.img === itemData.img && existingItem.name === itemData.name && existingItem.price === itemData.price);

      if (!itemExists) {
        cart.push(itemData);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        console.log('سبد خرید به روز شد:', cart);

        // باز کردن سبد خرید بعد از اضافه کردن آیتم
        const basketpage = document.querySelector(".basketpage");
        const subbasketpage = document.querySelector(".subbasketpage");
        
        if (basketpage && subbasketpage) {
          basketpage.classList.remove("hidden");
          basketpage.classList.add("block");
          subbasketpage.classList.remove("hidden");
          subbasketpage.classList.add("block");
        }

        updateCartPage(); // به روز رسانی محتوای سبد خرید
      } else {
        console.log('این آیتم قبلاً در سبد خرید وجود دارد.');
      }
    } else {
      console.log("داده‌های آیتم معتبر نیستند.");
    }
  });
});
function updateCartPage() {
  const subbasketpage = document.querySelector(".subbasketpage");

  if (subbasketpage) {
    subbasketpage.innerHTML = ''; 
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.img && item.name && item.price); 
    localStorage.setItem('cart', JSON.stringify(cart)); 

    if (cart.length > 0) {
      cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <div class="w-[98%] mt-[2px] mx-auto flex flex-row justify-around items-center border-[1px] border-solid border-[lightgray] rounded-[15px]">
            <img src="${item.img}" alt="product image" class="w-[30%] h-[114px]" />
            <p class="w-[40%] font-[iranyekanmedium] text-[#2b2b2b] text-ellipsis text-wrap text-[12px]">${item.name}</p>
            <a class="deletebutton block w-[20%] h-[20px]" href="#">
              <img src="./public/svg/trashplus.svg" alt=""/>
            </a>
          </div>
        `;
        
        const deleteButton = itemElement.querySelector(".deletebutton");
        deleteButton.addEventListener('click', (e) => {
          e.preventDefault(); 
          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          cart = cart.filter(cartItem => cartItem.name !== item.name); 
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartPage(); 
        });

        subbasketpage.appendChild(itemElement);
      });
    } else {
      subbasketpage.innerHTML = '<p>سبد خرید شما خالی است.</p>';
    }
  }
}

updateCartPage(); 