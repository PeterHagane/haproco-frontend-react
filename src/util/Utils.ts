//misc utils
import { notify } from "../components/Toast"

export const getDimensionsOfElementById = (id: string) =>{
  const e = document.getElementById(id)
  return {x: e?.offsetWidth || 0, y: e?.offsetHeight || 0}
} 

export const changeStyleOfElementById = (id: string, cssClass: string, delay?: number, remove?: boolean) => {
  const e = document.getElementById(id)
  !remove && e?.classList.add(cssClass)
  remove && e?.classList.remove(cssClass)
  //cleanup for animations
  delay && delayStateChange(() => e?.classList.remove(cssClass), delay)
}

export const changeStyle = (element: HTMLElement, cssClass: string, delay?: number, remove?: boolean) => {
  !remove && element?.classList.add(cssClass)
  remove && element?.classList.remove(cssClass)
  //cleanup for animations
  delay && delayStateChange(() => element?.classList.remove(cssClass), delay)
}

export const delayStateChange = (callback: () => void, delay: number) => {
  setTimeout(() => {
    callback()
  }, delay)
}

export const delayStateChangeAsync = async (callback: () => void, delayms: number) => {
  delay(delayms)
  callback()
}

export const getScrolledDistance =()=> {
  return Math.round(window.scrollY / (document.body.offsetHeight - window.innerHeight) * 100);
}

export const getDistanceFromTop =()=>{
  return Math.round(window.scrollY);
}

export const getDistanceFromBottom =()=>{
  return Math.round(document.body.offsetHeight - window.scrollY);
}

export const getElementsByQuery =(s: string)=>{
  return document.querySelectorAll(s)
}

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


export function copyURI(event: any, string?: string, notification?: string) {
  event.preventDefault();
  console.log(event);
  string && navigator.clipboard.writeText(string).then(() => {
    notify({title: notification ? `${notification} ${string}` : `Copied ${string}`})
  }, () => {
  });
}

export const getAge = () => {    
  var bd = new Date("September 20, 1989 00:00:00");
  var ageDifMs = Date.now() - bd.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const observer = (cssClassRemove: string, cssClassAdd: string, repeat?: boolean) => new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.remove(cssClassRemove)
      entry.target.classList.add(cssClassAdd)
    }
    if(!!repeat && !entry.isIntersecting){
      entry.target.classList.remove(cssClassAdd)
      entry.target.classList.add(cssClassRemove)
    }
  })
})

export const capitalise = (text: string)=>{
  return text[0].toUpperCase() + text.slice(1, text.length)
}
export const c = capitalise