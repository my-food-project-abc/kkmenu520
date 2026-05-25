
const supabaseUrl = "https://noisy-bird-14c5.3404448238.workers.dev";
const supabaseAnonKey = "sb_publishable_0xqUP0CY4NnerWMYxPCXAg_uUX4MyfL";

const { createClient } = supabase;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const PASSWORD = "5201314";

// ==========================================
// 菜单
// ==========================================
const menuData = [
  "🍓 生气套餐",
  "🍰 下单一份奶茶 自选品牌",
  "🍟 一起微光",
  "🍡 想你了按一下",
  "🍜 在闹别扭，求哄",
  "🧋 快回消息",
  "🎮 一起打游戏",
  "🥺 这次非常生气 很认真"
];

let cart = [];
const menuList = document.getElementById("menuList");
const cartList = document.getElementById("cartList");

// ==========================================
// 渲染菜单
// ==========================================
menuData.forEach(item => {
  let div = document.createElement("div");
  div.className = "menu-item";
  div.innerText = item;
  div.onclick = () => {
    div.classList.toggle("active");
    if (cart.includes(item)) {
      cart = cart.filter(i => i !== item);
    } else {
      cart.push(item);
    }
    renderCart();
  };
  menuList.appendChild(div);
});

// ==========================================
// 渲染购物车
// ==========================================
function renderCart() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<div class='empty-tip'>购物车里空空如也，困困还没有选哦～</div>";
    return;
  }
  cart.forEach((item, i) => {
    let el = document.createElement("div");
    el.className = "cart-item";
    el.innerText = item + " 困困点击这里删除喔";
    el.onclick = () => {
      cart.splice(i, 1);
      renderCart();
      document.querySelectorAll(".menu-item").forEach(e => {
        if (e.innerText === item) e.classList.remove("active");
      });
    };
    cartList.appendChild(el);
  });
}

// ==========================================
// 密码验证
// ==========================================
function submitWithPassword() {
  if (cart.length === 0) {
    alert("你还什么都没有选不能提交哦");
    return;
  }
  let input = prompt("困困请输入下单口令：");
  if (!input) return;
  if (input !== PASSWORD) {
    alert("❌ 口令错误！");
    return;
  }
  submitOrder();
}

// ==========================================
// 提交订单（已修复）
// ==========================================
async function submitOrder() {
  const { error } = await supabase
    .from("orders")
    .insert([
      {
        items: cart.join(" | "),
        time: new Date().toLocaleString()
      }
    ]);

  if (error) {
    alert("下单失败：" + error.message);
    console.error(error);
  } else {
    alert("✅ 下单成功！");
    cart = [];
    renderCart();
    document.querySelectorAll(".menu-item").forEach(i => i.classList.remove("active"));
  }
}

// ==========================================
// 启动
// ==========================================
renderCart();
