/* =========================================================
   Teh Shin Yun — 交互逻辑
   ========================================================= */
const HTMLLANG = { en:"en", zh:"zh-Hans", ko:"ko" };
let LANG = "en";

/* ---------------- 语言 ---------------- */
/* 回退顺序：所选语言 → 英文 → 空字符串。
   绝不保留上一个语言的旧文本（那是串语言的根源）。 */
function tr(key){
  const d = I18N[LANG] || {};
  if(d[key] !== undefined) return d[key];
  if(I18N.en[key] !== undefined){
    console.warn("[i18n] missing " + LANG + " value for: " + key);
    return I18N.en[key];
  }
  console.warn("[i18n] unknown key: " + key);
  return "";
}
function applyLang(code){
  LANG = I18N[code] ? code : "en";
  document.documentElement.lang = HTMLLANG[LANG];
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    el.textContent = tr(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el=>{
    el.setAttribute("aria-label", tr(el.getAttribute("data-i18n-aria")));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach(el=>{
    el.setAttribute("alt", tr(el.getAttribute("data-i18n-alt")));
  });
  const lbl = document.getElementById("langLabel");
  if(lbl) lbl.textContent = LANG.toUpperCase();
  try{ localStorage.setItem("tsy-lang", LANG); }catch(e){}
}
function pickLang(c){
  applyLang(c);
  document.getElementById("lveil")?.classList.remove("on");
  document.getElementById("langMenu")?.classList.remove("open");
}
function toggleLangMenu(){ document.getElementById("langMenu")?.classList.toggle("open"); }

/* ---------------- 工牌 ---------------- */
function dropBadge(){
  const v = document.getElementById("veil"), h = document.getElementById("hang");
  if(!v) return;
  v.classList.add("on");
  h.style.animation = "none"; void h.offsetWidth; h.style.animation = "";
}
function closeBadge(){ document.getElementById("veil")?.classList.remove("on"); }

/* ---------------- 首页导航高亮 ---------------- */
function initScrollSpy(){
  const secs = ["home","work","journey","lab","notes"]
    .map(id=>document.getElementById(id)).filter(Boolean);
  if(secs.length < 2) return;
  const links = {};
  document.querySelectorAll(".menu a[data-sec]").forEach(a=>{ links[a.dataset.sec] = a; });
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting) return;
      Object.values(links).forEach(a=>a.classList.remove("on"));
      if(links[en.target.id]) links[en.target.id].classList.add("on");
    });
  }, { rootMargin:"-45% 0px -50% 0px", threshold:0 });
  secs.forEach(s=>io.observe(s));
}

/* ---------------- 足迹路线动画 ---------------- */
function initRoute(){
  document.querySelectorAll(".route").forEach(r=>{
    r.querySelectorAll(".rline").forEach((p,i)=>{
      let len = 600;
      try{ len = p.getTotalLength(); }catch(e){}
      p.style.strokeDasharray = "4 6";
      p.style.strokeDashoffset = len;
      p.style.setProperty("--len", len);
      p.style.animationDelay = (0.25 + i*0.32) + "s";
    });
    r.querySelectorAll(".dot").forEach((d,i)=>{ d.style.animationDelay = (i*0.32)+"s"; });
    r.querySelectorAll(".lbl").forEach((d,i)=>{ d.style.animationDelay = (0.08+i*0.32)+"s"; });
    r.querySelectorAll(".yrs").forEach((d,i)=>{ d.style.animationDelay = (0.14+i*0.32)+"s"; });
    new IntersectionObserver((e,o)=>{
      if(e[0].isIntersecting){ r.classList.add("go"); o.disconnect(); }
    },{threshold:.25}).observe(r);
  });
}

/* ---------------- 灯箱（换上真实图片后自动生效） ---------------- */
function initLightbox(){
  const lb = document.getElementById("lightbox");
  if(!lb) return;
  document.addEventListener("click", e=>{
    const img = e.target.closest(".sheet img, .shot img, .block img");
    if(!img) return;
    const t = lb.querySelector("img");
    t.src = img.src; t.alt = img.alt || "";
    lb.classList.add("on");
  });
  lb.addEventListener("click", ()=>lb.classList.remove("on"));
}

/* ---------------- 启动 ---------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  let saved = null;
  try{ saved = localStorage.getItem("tsy-lang"); }catch(e){}
  applyLang(saved || "en");
  if(!saved) document.getElementById("lveil")?.classList.add("on");

  initScrollSpy();
  initRoute();
  initLightbox();

  document.addEventListener("click", e=>{
    if(!e.target.closest(".langbox")) document.getElementById("langMenu")?.classList.remove("open");
  });
  document.addEventListener("keydown", e=>{
    if(e.key === "Escape"){
      closeBadge();
      document.getElementById("lveil")?.classList.remove("on");
      document.getElementById("lightbox")?.classList.remove("on");
    }
  });
});
