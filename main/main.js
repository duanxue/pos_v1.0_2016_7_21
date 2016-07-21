'use strict';
function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}
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
function formatTags(tags)
{
    return tags.map(function(item) {
                                let info=item.split('-');
                                return {
                                    barcode:info[0],
                                    amount:parseFloat(info[1])||1
                                        };
                                    });
}
function mergedBarcodes(barcodes)
{
    let countedBarcodes=[];
    for(let i=0;i<barcodes.length;i++)
    {
        let existItem=countedBarcodes.find(function(item) {
            return item.barcode===barcodes[i].barcode;
        });
        if(existItem)
            existItem.amount=parseFloat(existItem.amount)+parseFloat(barcodes[i].amount);
        else
            countedBarcodes.push(barcodes[i]);
    }
    return countedBarcodes;
}
function getCartItems(countedBarcodes,items)
{
    let cartItems=[];
    for(let i=0;i<countedBarcodes.length;i++)
    {
        let existItem=items.find(function(item){
            return item.barcode===countedBarcodes[i].barcode;
        });
        if(existItem)
        {
            cartItems.push(Object.assign({},existItem,{amount:countedBarcodes[i].amount}));
        }
    }
    return cartItems;
}
function getSubtotal(cartItems)
{
    return cartItems.map(function(item)
    {
        return   Object.assign({},item,{subtotal:item.amount*item.price});
    });
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
    for(let i=0;i<detailedCartItems.length;i++) {
        let existItem = promotionItems.find(function(item) {
            return item.barcodes.find(function (bar) {
                return bar === detailedCartItems[i].barcode;
            })
        });
        if (existItem) {
            if (existItem.type === 'BUY_TWO_GET_ONE_FREE') {
                detailedCartItems[i].subtotal -= parseInt(detailedCartItems[i].amount / 3) * detailedCartItems[i].price;
                                                 }
            else {

                  }
                      }
    }
    return detailedCartItems;
}
function getPromotionTotal(promotionCartItems)
{
    let promotionTotal=0;
    for(let i=0;i<promotionCartItems.length;i++)
    {
        promotionTotal+=promotionCartItems[i].subtotal;
    }
    return promotionTotal;
}
function print(promotionCartItems,promotionTotal,total)
{
    var str='';
    str+='***<没钱赚商店>收据***\n';
    for(let i=0;i<promotionCartItems.length;i++)
    {
        str+=('名称：'+promotionCartItems[i].name+'，数量：'+promotionCartItems[i].amount+promotionCartItems[i].unit+'，单价：'+promotionCartItems[i].price.toFixed(2)+'(元)，'+'小计：'+promotionCartItems[i].subtotal.toFixed(2)+'(元)\n');
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
    let promotionItems=loadPromotions();
    let barcodes=formatTags(tags);
    let countedBarcodes=mergedBarcodes(barcodes);
    let cartItems=getCartItems(countedBarcodes,items);
    let detailedCartItems=getSubtotal(cartItems);
    let total=getTotal(detailedCartItems);
    let promotionCartItems=getPromotionCartItems(detailedCartItems,promotionItems);
    let promotionTotal=getPromotionTotal(promotionCartItems);
    print(promotionCartItems,promotionTotal,total);
}
//printReceipt(tags);