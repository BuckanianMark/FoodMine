import { Food } from "./app/shared/Models/Food"; 
import { Tag } from "./app/shared/Models/Tag";

export const sample_foods:Food[]= 
    [
    {
        id:"1",
        Foodname:'Avocado Burger',
        price:11,
        tags:["FastFood","Burger","Lunch"],
        favourite:true,
        stars:4.0,
        imageUrl:"assets/Burger1.png",
        origins:['Italy'],
        cookTime:'30-4'
    },
    {
        id:"2",
        Foodname:'Mexican Pizza',
        price:11,
        tags:["FastFood","Pizza","Lunch"],
        favourite:false,
        stars:4.0,
        imageUrl:"assets/Pizza2.jpg",
        origins:['Italy'],
        cookTime:'30-4'
    },
    {
        id:"3",
        Foodname:'Avocado Burger',
        price:11,
        tags:["FastFood","Burger","Lunch"],
        favourite:false,
        stars:4.0,
        imageUrl:"assets/Burger1.png",
        origins:['Italy'],
        cookTime:'30-4'
    },
    {
        id:"4",
        Foodname:'Mexican Pizza',
        price:11,
        tags:["FastFood","Pizza","Lunch"],
        favourite:false,
        stars:4.0,
        imageUrl:"assets/Pizza2.jpg",
        origins:['Italy'],
        cookTime:'30-4'
    },
    {
        id:"5",
        Foodname:'Avocado Burger',
        price:11,
        tags:["FastFood","Burger","Lunch"],
        favourite:true,
        stars:4.0,
        imageUrl:"assets/Burger1.png",
        origins:['Italy'],
        cookTime:'30-4'
    },
    {
        id:"6",
        Foodname:'Mexican Pizza',
        price:11,
        tags:["FastFood","Pizza","Lunch"],
        favourite:false,
        stars:4.0,
        imageUrl:"assets/Pizza2.jpg",
        origins:['Italy'],
        cookTime:'30-4'
    }

]
export const sample_tags:Tag[]=[
    {name:'All',count:6},
    {name:'FastFood',count:6},
    {name:'Pizza',count:3},
    {name:'Burger',count:3},

]
   
    

