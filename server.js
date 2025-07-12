'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
    e.preventDefault()
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn)=>btn.addEventListener('click',openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const header=document.querySelector('.header')

const cookie_ele=document.createElement('div')
cookie_ele.classList.add('cookie-message')
cookie_ele.innerHTML=`We use cookies for better performance and montiroing<button class="btn btn-close-cookie">Okay</button>`
header.after(cookie_ele)
document.querySelector('.btn-close-cookie').addEventListener('click',function(){
    cookie_ele.remove();
})
cookie_ele.style.backgroundColor='gray'
cookie_ele.style.width='100vw'

const btn_scroll=document.querySelector('.btn--scroll-to');
const scroll_section=document.querySelector('#section--1')

btn_scroll.addEventListener('click',function(e){
    const s_cord=scroll_section.getClientRects();
    console.log(s_cord,window.pageYOffset,s_cord['0'].left)
    window.scrollTo({left:s_cord['0'].left,top:s_cord['0'].top+window.pageYOffset,behavior:'smooth'});
})

const nav_links=document.querySelector('.nav__links')
        nav_links.addEventListener('click',function(e){
        e.preventDefault()
        if(e.target.classList.contains('nav__link'))
        {
            const id=e.target.getAttribute('href')
            console.log(id)
            const sec_ele=document.getElementById(id.slice(1))
            sec_ele.scrollIntoView({behavior:"smooth"})
            console.log(sec_ele.parentElement)
        }
        // console.log()
    })

const tab_btn=document.querySelectorAll('.operations__tab')
const tab_content=document.querySelectorAll('.operations__content')
const tab_container=document.querySelector('.operations__tab-container')
tab_container.addEventListener('click',function(e){
    e.preventDefault();
        const par=e.target.closest('.operations__tab')
        if(par==undefined)
            return;
        const tab_num=par?.getAttribute('data-tab');
        tab_btn?.forEach((tab)=>{
            tab.classList.remove('operations__tab--active')
        })
        par.classList.add('operations__tab--active')
        // const tab_content_arr=[...tab_content]
        tab_content?.forEach((tab)=>{
            tab.classList.remove('operations__content--active')
        })
        tab_content[tab_num-1]?.classList.add('operations__content--active')
    
})

const nav=document.querySelector('.nav')
const nav__links=document.querySelector('.nav__links')
const nav__link=document.querySelectorAll('.nav__link')
const handleOpacity=function(e){
    const target=e.target;
    const img=nav.querySelector('img')
    if(target.classList.contains('nav__link'))
    {
        img.style.opacity=this
        nav__link.forEach((d)=>{
            if(d!=target)
            d.style.opacity=this
        })
    }
}
// nav__links.addEventListener('mouseover',(e)=>{
//     handleOpacity(e,0.6)
// })
// nav__links.addEventListener('mouseout',(e)=>{
//     handleOpacity(e,1)
// })
nav__links.addEventListener('mouseover',handleOpacity.bind(0.5))
nav__links.addEventListener('mouseout',handleOpacity.bind(1.0))

const section1=document.querySelector('#section--1')
const intital_cord=section1.getClientRects();
// window.addEventListener('scroll',(e)=>{
//     const a=window.scrollY
//     const nav=document.querySelector('.nav')
//     console.log(a,intital_cord[0])
//     if(a>=intital_cord[0].y)
//     nav.classList.add('sticky')
//     else
//     nav.classList.remove('sticky')
// })

const handleNavbar=function(e){
const [data]=e
console.log(data)
    if(!data.isIntersecting)
        nav.classList.add('sticky')
    else
    nav.classList.remove('sticky')

    
}
const navHeight=nav.getClientRects()[0].height
const headerObs=new IntersectionObserver(handleNavbar,{
    root:null,
    threshold:[0,0.1],
    rootMargin:`-${navHeight}px`
})
headerObs.observe(header)

const handleReveal=function(e)
{
    e.forEach(d=>{
        if(!d.isIntersecting)
            return

        d.target.classList.remove('section--hidden')
    })
}
//.section--hidden
const section_obs=new IntersectionObserver(handleReveal,{root:null,threshold:0.25})
const allsection=document.querySelectorAll('.section');
allsection.forEach(data=>{
    data.classList.add('section--hidden')
    section_obs.observe(data)
})

const handlelazyImage=function(e)
{
    const [data]=e;
    e.forEach(data=>{
    if(!data.isIntersecting) return

    data.target.src=data.target.getAttribute('data-src')
    data.target.addEventListener('load',(e)=>{
        data.target.classList.remove('lazy-img')

    })
    console.log(data.target)
    })
}
const allimages=document.querySelectorAll('img[data-src]')
const imageObserver=new IntersectionObserver(handlelazyImage,{root:null,threshold:0,rootMargin:'30px'})
allimages.forEach(data=>{
    imageObserver.observe(data);
})

const allslides=document.querySelectorAll('.slide')
const handleSlider=function(slide)
{
    allslides.forEach((ele,ind)=>{
        ele.style.transform=`translateX(${(ind-slide)*100}%)`
    })
}

const slider_btn_left=document.querySelector('.slider__btn--left');
const slider_btn_right=document.querySelector('.slider__btn--right');
let currslide=0,max_slide=allslides.length;

const prevSlide=function(e){
        if(currslide==0)
        currslide=max_slide-1
        else
        --currslide
        handleSlider(currslide)
        activateDot(currslide)
    
}
const nextSlide=function(e){
    if(currslide==max_slide-1)
    currslide=0;
    else
    currslide++
    handleSlider(currslide)
    activateDot(currslide)

}
slider_btn_left.addEventListener('click',prevSlide)
slider_btn_right.addEventListener('click',nextSlide)

document.addEventListener('keydown',function(e){
    if(e.code=="ArrowRight")
        nextSlide()
    if(e.code=="ArrowLeft")
        prevSlide()
})



const dots=document.querySelector('.dots')

const activateDot=function(slide_num)
{
    document.querySelectorAll('.dots__dot').forEach((data)=>{
        data.classList.remove('dots__dot--active')
    })
    document.querySelector(`.dots__dot[data-slide='${slide_num}']`).classList.add('dots__dot--active')

}


dots.addEventListener('click',e=>{
    e.preventDefault();
    if(e.target.classList.contains('dots__dot'))
    {
        const slide_num=e.target.getAttribute('data-slide')
        console.log(slide_num,e.target)
        currslide=slide_num
        handleSlider(currslide)
        activateDot(slide_num)
    }
})
const createDots=function(){
    allslides.forEach((_,i)=>{
        const btn=`<button class="dots__dot " data-slide=${i}></button>`
        dots.insertAdjacentHTML('beforeend',btn)
    })
}
const init=function()
{
    
    handleSlider(0)
    createDots()
    activateDot(0)

}

init()