import {storage} from '../storage.js';
import {bi,text} from '../i18n.js';
import {escapeHTML} from '../utils.js';

const categories=[
  ['food','🍜','餐食','Ăn uống'],
  ['shopping','🛒','購物','Mua sắm'],
  ['activity','🌺','自費活動','Hoạt động'],
  ['transport','🚕','交通','Di chuyển'],
  ['gift','🎁','伴手禮','Quà tặng'],
  ['other','📌','其他','Khác']
];

function categoryInfo(id){return categories.find(item=>item[0]===id)||categories.at(-1)}

function breakdownMarkup(items){
  const totals=categories.map(category=>({category,total:items.filter(item=>(item.category||'other')===category[0]).reduce((sum,item)=>sum+Number(item.myr||0),0)})).filter(row=>row.total>0);
  const max=Math.max(...totals.map(row=>row.total),1);
  if(!totals.length)return `<div class="empty">${text('尚無統計資料','Chưa có dữ liệu')}</div>`;
  return `<div class="category-breakdown">${totals.map(({category,total})=>`<div><span>${category[1]} ${bi(category[2],category[3])}</span><div class="bar-track"><i style="width:${Math.round(total/max*100)}%"></i></div><b>RM ${total.toFixed(2)}</b></div>`).join('')}</div>`;
}

export function walletPage(){
  const items=storage.get('wallet',[]);
  const rate=Number(storage.get('rate',7.5))||7.5;
  const total=items.reduce((sum,item)=>sum+Number(item.myr||0),0);
  return `<section class="section"><p class="eyebrow">WALLET</p><h1>${bi('旅遊記帳','Chi tiêu du lịch')}</h1><div class="grid wallet-kpis"><div class="card kpi"><small>${bi('累計支出','Tổng chi')}</small><b>RM ${total.toFixed(2)}</b></div><div class="card kpi"><small>${bi('約合台幣','Ước tính TWD')}</small><b>NT$ ${(total*rate).toFixed(0)}</b></div><div class="card kpi"><small>${bi('記錄筆數','Số giao dịch')}</small><b>${items.length}</b></div></div></section><section class="card section converter-card"><div class="section-head"><div><p class="eyebrow">CURRENCY</p><h2>${bi('RM ↔ NTD 雙向換算','Đổi hai chiều RM ↔ NTD')}</h2></div></div><div class="converter-grid"><div class="field"><label>MYR (RM)</label><input id="convertMyr" inputmode="decimal" type="number" min="0" step="0.01" value="100"></div><span class="swap-icon">⇄</span><div class="field"><label>TWD (NT$)</label><input id="convertTwd" inputmode="decimal" type="number" min="0" step="1" value="${(100*rate).toFixed(0)}"></div></div><div class="rate-row"><label for="rateInput">${bi('匯率：1 MYR =','Tỷ giá: 1 MYR =')}</label><input id="rateInput" type="number" min="0.01" step="0.01" value="${rate}"><span>TWD</span></div><small>${bi('匯率可自行修改，並儲存在本機。','Có thể sửa tỷ giá; dữ liệu được lưu trên thiết bị.')}</small></section><section class="card section"><h2>${bi('新增支出','Thêm chi tiêu')}</h2><form id="expenseForm"><div class="field"><label>${bi('項目','Mục')}</label><input name="title" maxlength="60" required placeholder="${text('例：Fipper 拖鞋','VD: Dép Fipper')}"></div><div class="grid two"><div class="field"><label>${bi('分類','Phân loại')}</label><select name="category">${categories.map(category=>`<option value="${category[0]}">${category[1]} ${text(category[2],category[3])}</option>`).join('')}</select></div><div class="field"><label>${bi('金額','Số tiền')} MYR</label><input name="myr" type="number" inputmode="decimal" min="0.01" step="0.01" required></div></div><button class="primary-btn">${bi('加入記帳','Thêm giao dịch')}</button></form></section><section class="card section"><h2>${bi('分類統計','Thống kê theo loại')}</h2>${breakdownMarkup(items)}</section><section class="card section"><h2>${bi('支出紀錄','Lịch sử chi tiêu')}</h2><div id="expenseList">${items.map((item,index)=>{const category=categoryInfo(item.category);return `<div class="expense"><span class="expense-icon">${category[1]}</span><div><b>${escapeHTML(item.title)}</b><small>${bi(category[2],category[3])} · ${escapeHTML(item.date||'')}</small></div><div><b>RM ${Number(item.myr).toFixed(2)}</b><button class="danger-link" data-delete-expense="${index}">${bi('刪除','Xóa')}</button></div></div>`}).join('')||`<div class="empty">${text('尚無記錄','Chưa có dữ liệu')}</div>`}</div></section>`;
}

export function bindWallet(render){
  const rateInput=document.querySelector('#rateInput');
  const myrInput=document.querySelector('#convertMyr');
  const twdInput=document.querySelector('#convertTwd');
  const currentRate=()=>Number(rateInput?.value)||7.5;
  myrInput?.addEventListener('input',()=>{twdInput.value=(Number(myrInput.value||0)*currentRate()).toFixed(0)});
  twdInput?.addEventListener('input',()=>{myrInput.value=(Number(twdInput.value||0)/currentRate()).toFixed(2)});
  rateInput?.addEventListener('change',event=>{
    const rate=Math.max(0.01,Number(event.target.value)||7.5);
    event.target.value=rate;
    storage.set('rate',rate);
    twdInput.value=(Number(myrInput.value||0)*rate).toFixed(0);
  });
  document.querySelector('#expenseForm')?.addEventListener('submit',event=>{
    event.preventDefault();
    const form=new FormData(event.target);
    const items=storage.get('wallet',[]);
    items.unshift({title:String(form.get('title')).trim(),category:form.get('category'),myr:Number(form.get('myr')),date:new Date().toLocaleDateString('zh-TW')});
    storage.set('wallet',items);
    render();
  });
  document.querySelectorAll('[data-delete-expense]').forEach(button=>button.onclick=()=>{
    const items=storage.get('wallet',[]);
    items.splice(Number(button.dataset.deleteExpense),1);
    storage.set('wallet',items);
    render();
  });
}
