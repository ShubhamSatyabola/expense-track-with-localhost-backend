var form = document.getElementById('addform')
var ul = document.getElementById('list-group')

form.addEventListener('submit', setlocalStorage)
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token')
        const page = 1
        //console.log(token)
        const res = await axios.get(`http://localhost:3000/expense/get-expense?page=${page}`, {headers: {'Authorization': token}});
        console.log(res)
        if(res.data.check == true){
            premiumFeatures()
            
        //     document.getElementById('rzp-button1').remove()
        //     document.getElementById('text').innerHTML='you are a premium user now'
         }
        listExpense(res.data.allExpense)
        showPagination(res.data)
        
        // for(i in res.data.allExpense){
        //     showOnScreen(res.data.allExpense[i])
        // }

    }catch(err){
        console.log(err)
    }
})
async function listExpense(data){
    try{
        for (i in data){
            showOnScreen(data[i])
        }
    }
    catch(err){
        console.log(err)
    }
    

}
async function setlocalStorage(e){
    try{e.preventDefault();
    
    var amount = document.getElementById('ExpenseAmount').value;
    var description = document.getElementById('Description').value;
    var category = document.getElementById('Category').value;
    
    const data = {amount , description , category};
    const token = localStorage.getItem('token')
    const response = await axios.post('http://localhost:3000/expense/post-expense',data, {headers: {'Authorization': token}})
    window.location.reload()
    //console.log(response)
    // const res = await axios.get(`http://localhost:3000/expense/get-expense?page=1`, {headers: {'Authorization': token}});
    //listExpense(response.data.expenseDetail[0])
    // showPagination(response.data)
    //showOnScreen(response.data.expenseDetail[0]);
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
            //console.log(remove)
            alert(remove.data.message)
        }
        li.appendChild(btn)
        ul.appendChild(li)
    }catch(err){
        console.log(err);
    }
    
    }

document.getElementById('rzp-button1').onclick = async function(e){
    try{
       const token = localStorage.getItem('token');
       const response = await axios.get('http://localhost:3000/purchase/premium-membership',{headers:{'Authorization':token}})
       //console.log(response)
       var options = {
        "key": response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function(response){
            await axios.post('http://localhost:3000/purchase/update-transaction-status',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id
            },{headers:{'Authorization':token}})
            premiumFeatures()
            
            
            }
       }
       const rzp1 = new Razorpay(options);
       rzp1.open();
       e.preventDefault()
       rzp1.on('payment.failed', async function(response){
        await axios.post('http://localhost:3000/purchase/update-transaction-status',{
                status: "failed",
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id
            },{headers:{'Authorization':token}})
        //console.log(response)
        
       })
    }
    catch(err){
        console.log(err)
    }
    }

async function premiumFeatures(){
     try{
        document.getElementById('text').innerHTML='you are a premium user now'
        const leaderboard = document.getElementById('rzp-button1')
        leaderboard.innerHTML = "show leaderboard"
        leaderboard.onclick = async () => {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:3000/premium/leaderboard',{headers:{'Authorization':token}})
           //console.log(response)
            for (let i of response.data.leaderboarduser ){
                const li = document.createElement('li')
                li.className = 'list-group-item'
                li.textContent=`Name ${i.name} ==> total expense  ${i.totalexpense}`
                document.getElementById('text').appendChild(li)
            }
        }
     }
     catch(err){
        console.log(err)
     }
}

async function downloadReport(){
    try{
        const token = localStorage.getItem('token')
        const report = await axios.get('http://localhost:3000/expense/download-report',{headers:{'Authorization':token}})
        //console.log(report)
        if(report.status === 200){
            var a = document.createElement('a')
            a.href = report.data.fileURl
            a.download ='myexpense.csv'
            a.click()
        }
        else{
            throw new Error (report.data.error)
        }
    }
    catch(err){
        console.lg(err)
    }
}
async function showPagination({currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,lastPage}){
    try{
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = ''
        if(hasPreviousPage){
            const btn2 = document.createElement('button')
            btn2.innerHTML = previousPage
            btn2.addEventListener('click', ()=>getProducts(previousPage))
            pagination.appendChild(btn2)
        }
        const btn1 = document.createElement('button')
        btn1.innerHTML = currentPage
        btn1.addEventListener('click',()=>getProducts(currentPage))
        pagination.appendChild(btn1)

        if (hasNextPage){
            const btn3 = document.createElement('button')
            btn3.innerHTML = nextPage
            btn3.addEventListener('click',()=>getProducts(nextPage))
            pagination.appendChild(btn3)

        }

    }
    catch(err){
        console.log(err)
    }
}
async function getProducts(page){
    try{
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3000/expense/get-expense?page=${page}`,{headers: {'Authorization': token}})
        console.log(response)
        listExpense(response.data.allExpense)
        showPagination(response.data)
    }
    catch(err){
        console.log(err)
    }
}

