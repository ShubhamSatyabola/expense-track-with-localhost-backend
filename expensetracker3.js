var form = document.getElementById('addform')
var ul = document.getElementById('list-group')
form.addEventListener('submit', setlocalStorage)

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get('http://localhost:3000/get-expense');
        for(i in res.data.allExpense){
            showOnScreen(res.data.allExpense[i])
        }
    }catch(err){
        console.log(err)
    }
})
async function setlocalStorage(e){
    try{e.preventDefault();
    
    var amount = document.getElementById('ExpenseAmount').value;
    var description = document.getElementById('Description').value;
    var category = document.getElementById('Category').value;
    
    const data = {amount , description , category};
    const response = await axios.post('http://localhost:3000/post-expense', data)
    showOnScreen(response.data.expenseDetail);
    }catch (err){
        console.log(err)
    }
}
async function showOnScreen(data){
        try{var li = document.createElement('li')
        li.className = 'list-group-item'
        li.textContent = `${data.amount}  ${data.description}  ${data.category}`
        
        const btn = document.createElement('button')
        btn.className = 'btn btn-dark float-right Delete'
        btn.appendChild(document.createTextNode('Delete'))
        
        btn.onclick = () => {
            axios.delete(`http://localhost:3000/delete-expense/${data.id}`)
            .then(ul.removeChild(li))
        }
        const edit = document.createElement('button')
        edit.className = 'btn btn-dark float-right edit'
        edit.appendChild(document.createTextNode('Edit'))
        
        edit.onclick = () => {
            document.getElementById('ExpenseAmount').value=data.amount;
            document.getElementById('Description').value=data.description;
            document.getElementById('Category').value=data.category;

            
            axios.delete(`http://localhost:3000/delete-expense/${data.id}`)
            .then(ul.removeChild(li))
            
            
    
        }
    
        li.appendChild(btn)
        li.appendChild(edit)
        ul.appendChild(li)
    }catch(err){
        console.log(err);
    }
    
    }
    

