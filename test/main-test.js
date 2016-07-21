'use strict';
describe('formatTags',function(){
                              it('show formatTags',function(){
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
                                expect(formatTags(tags)).toEqual([{barcode:'ITEM000001',amount:1},
                                                                  {barcode:'ITEM000001',amount:1},
                                                                  {barcode:'ITEM000001',amount:1},
                                                                  {barcode:'ITEM000001',amount:1},
                                                                  {barcode:'ITEM000001',amount:1},
                                                                  {barcode:'ITEM000003',amount:2.5},
                                                                  {barcode:'ITEM000005',amount:1},
                                                                  {barcode:'ITEM000005',amount:2}
                                                                  ]);
                                                              });
                              });
describe('mergedBarcodes',function(){
                               it('show mergedBarcodes',function(){
                                 let barcodes=[{barcode:'ITEM000001',amount:1},
                                   {barcode:'ITEM000001',amount:1},
                                   {barcode:'ITEM000001',amount:1},
                                   {barcode:'ITEM000001',amount:1},
                                   {barcode:'ITEM000001',amount:1},
                                   {barcode:'ITEM000003',amount:2.5},
                                   {barcode:'ITEM000005',amount:1},
                                   {barcode:'ITEM000005',amount:2}
                                 ];
                                 expect(mergedBarcodes(barcodes)).toEqual(
                                     [
                                       {barcode:'ITEM000001',amount:5},
                                       {barcode:'ITEM000003',amount:2.5},
                                       {barcode:'ITEM000005',amount:3}
                                     ]);
                               });
                                });
          describe('getCartItems',function(){
                             it('show cartItems',function(){
                              let countedBarcodes=[{barcode:'ITEM000001',amount:5},
                                                    {barcode:'ITEM000003',amount:2.5},
                                                    {barcode:'ITEM000005',amount:3}];
                             expect(getCartItems(countedBarcodes,loadAllItems())).toEqual(
                                 [{
                                   barcode: 'ITEM000001',
                                   name: '雪碧',
                                   unit: '瓶',
                                   price: 3.00,
                                   amount:5
                                 },
                                   {
                                     barcode: 'ITEM000003',
                                     name: '荔枝',
                                     unit: '斤',
                                     price: 15.00,
                                     amount:2.5
                                   },
                                   {

                                     barcode: 'ITEM000005',
                                     name: '方便面',
                                     unit: '袋',
                                     price: 4.50,
                                     amount:3
                                   }
                                 ]);
                             });
                                         });
   describe('getSubtotal',function(){  //此处测试出问题，粗心将测试内容写成对象，而实际应和实现内容保持一致，为对象数组型
     it('get detailedCartItems',function(){
       let cartItems=[
         {
           barcode: 'ITEM000001',
           name: '雪碧',
           unit: '瓶',
           price: 3.00,
           amount:5
         },
         {
           barcode: 'ITEM000003',
           name: '荔枝',
           unit: '斤',
           price: 15.00,
           amount:2.5
         },
         {

           barcode: 'ITEM000005',
           name: '方便面',
           unit: '袋',
           price: 4.50,
           amount:3
         }
       ];
       expect(getSubtotal(cartItems)).toEqual(
           [{ barcode: 'ITEM000001',
             name: '雪碧',
             unit: '瓶',
             price: 3,
             amount: 5,
             subtotal: 15 },
             { barcode: 'ITEM000003',
               name: '荔枝',
               unit: '斤',
               price: 15,
               amount: 2.5,
               subtotal: 37.5 },
             { barcode: 'ITEM000005',
               name: '方便面',
               unit: '袋',
               price: 4.5,
               amount: 3,
               subtotal: 13.5 } ]
       );
     });
   });
describe('getTotal',function(){
  it('show total',function(){
    let  detailedCartItems=[{ barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        amount: 5,
        subtotal: 15 },
      { barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15,
          amount: 2.5,
          subtotal: 37.5 },
      { barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5,
          amount: 3,
          subtotal: 13.5 } ];
    expect(getTotal(detailedCartItems)).toEqual(66);
  });
})
describe('getPromotionCartItems',function(){
  it('show promotionCartItems',function(){
    let  detailedCartItems=[{ barcode: 'ITEM000001',
       name: '雪碧',
      unit: '瓶',
      price: 3,
      amount: 5,
      subtotal: 15 },
      { barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15,
        amount: 2.5,
        subtotal: 37.5 },
      { barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.5,
        amount: 3,
        subtotal: 13.5 } ];
    expect(getPromotionCartItems(detailedCartItems,loadPromotions())).toEqual([
      { barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        amount: 5,
        subtotal: 12 },
      { barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15,
        amount: 2.5,
        subtotal: 37.5 },
      { barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.5,
        amount: 3,
        subtotal: 9}
    ]);
  });
});
describe('getPromotionTotal',function(){
  it('get promotionTotal',function(){
    let promotionCartItems=[
      { barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        amount: 5,
        subtotal: 12 },
      { barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15,
        amount: 2.5,
        subtotal: 37.5 },
      { barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.5,
        amount: 3,
        subtotal: 9}
    ];
    expect(getPromotionTotal(promotionCartItems)).toEqual(58.5);
  })
})
describe('pos', () => {

 it('should print text', () => {

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

 spyOn(console, 'log');

 printReceipt(tags);

 const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;//在es6中，const定义的文本原样输出，包括缩进一格都会有效。
 expect(console.log).toHaveBeenCalledWith(expectText);
 });
 });


