const form = document.querySelector("form");
const expenseList =  document.getElementById("expense-list");
const title =  document.getElementById("title");
const amount =  document.getElementById("amount");
const category =  document.getElementById("category");
const date =  document.getElementById("date");
const addExpenseBtn =  document.getElementById("add-expense-btn");
const searchValue =  document.getElementById("search_input");
const totalExpenseValue =  document.getElementById("total-expense-value");

       
let expenseitems = [];
let totalExpense = 0;
let editingID = null;
expenseitems = (localStorage.getItem("expenseitems"))? JSON.parse(localStorage.getItem("expenseitems")) : [];

if(!searchValue.value)
    {RenderExpense();
        console.log(searchValue.value);
    }
 
    searchValue.addEventListener("change",() =>{
        if(searchValue.value.toLowerCase() === "all")
        {
            RenderExpense();
        }
        else
        {
            SearchExpense(searchValue.value);
        }
        console.log(searchValue.value);
    });
title.value = "";
amount.value = "";
category.value = "";
date.value = "";

function saveToLocalStorage()
{
    const expenseitems_JSONformat = JSON.stringify(expenseitems);

    localStorage.setItem("expenseitems", expenseitems_JSONformat);
}

function addtoArray(obj)
{
    expenseitems.push(obj);
    saveToLocalStorage()
    console.log(expenseitems);
}

// const list_item='';

function SearchExpense(searchValue)
{   expenseList.innerHTML = '';
    expenseitems.forEach((e) =>{
        if(e.category.toLowerCase() === searchValue.toLowerCase())
        {   
            expenseList.innerHTML += 
                    `<li  class="grid grid-cols-5 gap-x-14 gap-y-12 bg-gray-100 px-16 py-8 ">
                        <span>${e.title}</span><span>${e.amount}</span><span>${e.category}</span>
                        <span>${e.date}</span><div><button class="hover:text-blue-500 edit-btn"  data-id=${e.id}>
                        <i class="bi bi-pencil"></i></button> <button class='pl-4 hover:text-blue-500 del-btn'  data-id=${e.id}>
                        <i class="bi bi-trash"></i></button></div>
                    </li>`;   
        }
 
        
    });

}

function RenderExpense()
{   
    
        // console.log(expenseitems);
        expenseList.innerHTML = '';
        // console.log(expenseitems.length);

    expenseitems.forEach((e) =>
    { 
        expenseList.innerHTML += 
                    `<li  class="grid grid-cols-5 gap-x-14 gap-y-12 bg-gray-100 px-16 py-8 ">
                        <span>${e.title}</span><span>${e.amount}</span><span>${e.category}</span>
                        <span>${e.date}</span><div><button  class="hover:text-blue-500 edit-btn" data-id=${e.id}>
                        <i class="bi bi-pencil"></i></button> <button class='pl-4 hover:text-blue-500 del-btn' data-id=${e.id}>
                        <i class="bi bi-trash"></i></button></div>
                    </li>`; 

                    totalExpense += Number(e.amount);
                   
    });
    totalExpenseValue.innerText = totalExpense;
}



addExpenseBtn.addEventListener("click", () =>
{

    if(!title.value || !amount.value || !category.value || !date.value)
                {
                    alert("Please fill all the fields");
                    return;
                }

    if(editingID === null )
    {   
        let expense_object =
        {    
            id: Date.now(),
            title: title.value,
            amount: amount.value,
            category: category.value,
            date: date.value,
        };
        addtoArray(expense_object);           
    }

    else
    {
         let expenseitemsToEdit = expenseitems.find((e)=> e.id === editingID);
                    expenseitemsToEdit.title=title.value,
                    expenseitemsToEdit.amount=amount.value,
                    expenseitemsToEdit.category=category.value,
                    expenseitemsToEdit.date=date.value,

                    saveToLocalStorage();
                    editingID = null;
                    addExpenseBtn.innerText = "Add Expense";

    }


   RenderExpense();
   form.reset();
});

expenseList.addEventListener("click", (e) =>{

    const deleteBtn = e.target.closest(".del-btn");
    if(deleteBtn)
    {
        const expense_ID = Number(deleteBtn.dataset.id);

        expenseitems = expenseitems.filter((e)=> e.id !== expense_ID);
        saveToLocalStorage();
        RenderExpense();

    }

    const editBtn = e.target.closest(".edit-btn");
    if(editBtn)
    {
        const expense_ID_2 = Number(editBtn.dataset.id);
        editingID = expense_ID_2;
        let expenseitemsToEdit = expenseitems.find((e)=> e.id === expense_ID_2);

        addExpenseBtn.innerText = "Update Expense";
     
     

                 title.value = expenseitemsToEdit.title;
                 amount.value = expenseitemsToEdit.amount;
                 category.value = expenseitemsToEdit.category;
                 date.value = expenseitemsToEdit.date;
     
                 
                    RenderExpense();
                    return;
      
    

    }
});
