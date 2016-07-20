'use strict';
const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
 function getSubcount(tags)
{
    let countedBarcodesf=[];
    for(let i=0;i<tags.length;i++)
    {
        if(tags[i].indexOf('-')==-1)
        {
            let existItem=countedBarcodesf.find(function(item){return item.barcode==tags[i]});
            if(existItem)
            {
                existItem.amount++;
            }
            else
                countedBarcodesf.push(Object.assign({},{barcode:tags[i],amount:1}));
        }
        else
        {
            let index=tags[i].indexOf('-');
            let amountString=tags[i].substring(index+1);
            countedBarcodesf.push(Object.assign({},{barcode:tags[i].substring(0,index),amount:parseFloat(amountString)}));
        }

    }
    let countedBarcodes=[];
    for(let i=0;i<countedBarcodesf.length;i++)
    {
        let existItems=countedBarcodes.find(function(item){return item.barcode==countedBarcodesf[i].barcode});
        if(existItems)
        {
            existItems.amount+=countedBarcodesf[i].amount;
        }
        else
            countedBarcodes.push(countedBarcodesf[i]);
    }
    return countedBarcodes;
}
function getCartItems(countedBarcodes,items)
{
    let cartItems=[];
    for(let i=0;i<countedBarcodes.length;i++)
    {
        let existItem=items.find(function(item){return countedBarcodes[i].barcode==item.barcode})//将与当前的一条商品记录条码相同的位于总清单里一条记录返回。
        cartItems.push(Object.assign({},{amount:countedBarcodes[i].amount},existItem));
    }
    return cartItems;
}
function getSubtotal(cartItems)
{
    let detailedCartItems=[];
    for(let i=0;i<cartItems.length;i++)
    {
        detailedCartItems.push(Object.assign({},cartItems[i],{subtotal:cartItems[i].price*cartItems[i].amount}));
    }
    return detailedCartItems;
}
function getTotal(detailedCartItems)
{
    let total=0;
    for(let i=0;i<detailedCartItems.length;i++)
    {
        total+=detailedCartItems[i].subtotal;
    }
    return total;
}
function getPromotionCartItems(detailedCartItems,promotionItems)
{
    let detailedPromotionCartItems=[];
    for(let i=0;i<detailedCartItems.length;i++)
    {
        for(let j=0;j<promotionItems.length;j++)
        {
            let existItem=(promotionItems[j].barcodes).find(function(item) {return item==detailedCartItems[i].barcode});
            if(existItem)
            {
                let tempType=promotionItems[j].type;
                for(let j=0;j<promotionItems.length;j++)
                {
                    if(tempType==promotionItems[j].type)
                    {
                        let count=parseInt(detailedCartItems[i].amount/3);
                        detailedCartItems[i].subtotal-=detailedCartItems[i].price*count;
                    }
                }
            }
        }


    }
    detailedPromotionCartItems=detailedCartItems;
    return detailedCartItems;
}
function getPromotionTotal(detailedPromotionCartItems)
{
    let promotionTotal=0;
    for(let i=0;i<detailedPromotionCartItems.length;i++)
    {
        promotionTotal+=detailedPromotionCartItems[i].subtotal;
    }
    return promotionTotal;
}
function print(detailedPromotionCartItems,promotionTotal,total)
{
    var str='';
    str+='***<没钱赚商店>收据***\n'; 
    for(let i=0;i<detailedPromotionCartItems.length;i++)
    {
        str+=('名称：'+detailedPromotionCartItems[i].name+'，数量：'+detailedPromotionCartItems[i].amount+detailedPromotionCartItems[i].unit+'，单价：'+detailedPromotionCartItems[i].price.toFixed(2)+'(元)，'+'小计：'+detailedPromotionCartItems[i].subtotal.toFixed(2)+'(元)\n');
    }
    str+='----------------------\n';
    str+=('总计：'+promotionTotal.toFixed(2)+'(元)\n');
   str+=('节省：'+(total-promotionTotal).toFixed(2)+'(元)\n');
    str+=('**********************');
    console.log(str);

}
function printReceipt(tags)
{
    let items=loadAllItems();
    let countedBarcodes=getSubcount(tags);
    let cartItems=getCartItems(countedBarcodes,items);
    let detailedCartItems=getSubtotal(cartItems);
    let total=getTotal(detailedCartItems);
    let promotionItems=loadPromotions();
    let detailedPromotionCartItems=getPromotionCartItems(detailedCartItems,promotionItems);
    let promotionTotal=getPromotionTotal(detailedPromotionCartItems);
    print(detailedPromotionCartItems,promotionTotal,total);
}
printReceipt(tags);
