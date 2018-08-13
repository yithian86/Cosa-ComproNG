/*~ If you want the name of this library to be a valid type name,
 *~ you can do so here.
 *~
 *~ For example, this allows us to write 'var x: myLib';
 *~ Be sure this actually makes sense! If it doesn't, just
 *~ delete this declaration and add types inside the namespace below.
 */
export interface IProduct {
  barCode: string,
  brand: string,
  id: number,
  productName: string,
  weightVolume: string
}

export interface ICategoryProducts {
  category: string,
  productList: Array<IProduct>
}