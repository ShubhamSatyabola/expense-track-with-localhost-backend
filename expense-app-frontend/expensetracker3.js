var form = document.getElementById('addform')
var ul = document.getElementById('list-group')
form.addEventListener('submit', setlocalStorage)

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token')
        console.log(token)
        const res = await axios.get('http://localhost:3000/expense/get-expense', {headers: {'Authorization': token}});
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
    const token = localStorage.getItem('token')
    const response = await axios.post('http://localhost:3000/expense/post-expense',data, {headers: {'Authorization': token}})
    showOnScreen(response.data.expenseDetail);
    }catch (err){
        console.log(err)
    }
}
async function showOnScreen(data){
    try{
        document.getElementById('ExpenseAmount').value = " ";
        document.getElementById('Description').value = " ";
        document.getElementById('Category').value = " ";

        var li = document.createElement('li')
        li.className = 'list-group-item'
        li.textContent = `${data.category} ==> ${data.description} ==> price : ${data.amount}rs`
        
        const btn = document.createElement('button')
        btn.className = 'btn btn-dark float-right Delete'
        btn.appendChild(document.createTextNode('Delete'))
        
        btn.onclick = async () => {
            const token = localStorage.getItem('token')
            ul.removeChild(li)
            const remove = await axios.delete(`http://localhost:3000/expense/delete-expense/${data.id}`,{headers: {'Authorization': token}})
            alert(remove.data.message)
        }
        li.appendChild(btn)
        ul.appendChild(li)
    }catch(err){
        console.log(err);
    }
    
    }
    

