document.addEventListener('DOMContentLoaded', () => {
    let selectedCategory = 'Retailer';
    const categorySelect = document.getElementById('category-select');
    const funnelImpressions = document.querySelector('.l1');
    const funnelRegistrations = document.querySelector('.l2');
    const funnelSubscriptions = document.querySelector('.l3');
    const btn = document.getElementById("doneButton");
    const loader = document.getElementById("loader");
    const result = document.getElementById("result");

    btn.addEventListener('click', () => {
       fakeLoader();
    });
    function fakeLoader(){
        const randomTimeout = Math.random() * (5000 - 3000) + 3000;
        const [imp, reg, sub] = getData();
        checkCompleted();
        if(imp ==0 || reg == 0 || sub == 0){
            loader.classList.add("hidden"); 
            result.classList.add("hidden"); 
            return;
        }
        loader.classList.remove("hidden"); 
        result.classList.add("hidden");   
        
        setTimeout(() => {
            loader.classList.add("hidden");   
            result.classList.remove("hidden"); 
            showFinalData();
        }, randomTimeout);
    }
    function showFinalData(){
        const y1 = document.querySelector(".y1");
        const y2 = document.querySelector(".y2");
        const y3 = document.querySelector(".y3");
        const y4 = document.querySelector(".y4");
        const y5 = document.querySelector(".y5");
        let year1 = 0, year2 = 0, year3 = 0, year4 = 0, year5 = 0;
        const [imp, reg, sub] = getData();
        let factor = 10;
        if(selectedCategory == "Retailer"){
            factor = 5;
        }
        for(let i = 1; i <=12 ; ++i){
            year1 += i;
        }
        year1 = sub * year1 * factor;
        for(let i = 13; i <=24 ; ++i){
            year2 += i;
        }
        year2 = sub * year2 * factor;
        for(let i = 25; i <=36 ; ++i){
            year3 += i;
        }
        year3 = sub * year3 * factor;
        for(let i = 37; i <=48 ; ++i){
            year4 += i;
        }
        year4 = sub * year4 * factor;
        for(let i = 49; i <=60 ; ++i){
            year5 += i;
        }
        year5 = sub * year5 * factor;

        y1.textContent = new Intl.NumberFormat().format(year1);
        y2.textContent = new Intl.NumberFormat().format(year2);
        y3.textContent = new Intl.NumberFormat().format(year3);
        y4.textContent = new Intl.NumberFormat().format(year4);
        y5.textContent = new Intl.NumberFormat().format(year5);
  
    }
    categorySelect.addEventListener('change', (event) => {
        selectedCategory = event.target.value;
        fakeLoader();
    });

    funnelImpressions.addEventListener('click', () => {
        window.location.href = `impressions.html?category=${selectedCategory}`;
    });

    funnelRegistrations.addEventListener('click', () => {
        window.location.href = `registrations.html?category=${selectedCategory}`;
    });

    funnelSubscriptions.addEventListener('click', () => {
        window.location.href = `subscriptions.html?category=${selectedCategory}`;
    });

    // Define the data structure with default empty values
    let data = {
        Retailer: {
            Impressions: [null, null, null, null, null, null],
            Subscriptions: [false, false, false, null],
            Registrations: [false, false, false, false, null]
        },
        SportClubs: {
            Impressions: [null, null, null, null, null, null],
            Subscriptions: [false, false, false, null],
            Registrations: [false, false, false, false, null]
        },
        Nation: {
            Impressions: [null, null, null, null, null, null],
            Subscriptions: [false, false, false, null],
            Registrations: [false, false, false, false, null]
        }
    };

    // Initialize the data in localStorage if not already present
    if (!localStorage.getItem('database')) {
        localStorage.setItem('database', JSON.stringify(data));
    }else{
        data = JSON.parse(localStorage.getItem('database'));
    }

    // Load data into variables
    const db = JSON.parse(localStorage.getItem('database'));
    retailerData = db.Retailer;
    sportClubsData = db.SportClubs;
    nationData = db.Nation;

    function getRegistrations(){
        const local = data[selectedCategory].Registrations;
        let total = 0.0;
        if(local[4] !== null){
            total = local[4] * 0.05;
        }
        return total;
    }
    function getImpressions(){
        const local = data[selectedCategory].Impressions;
        let total = 0;
        if(local.every(value => value !== null)){
            total = local[0]*30 + local[1]*50 + local[2] + local[3] + local[4] + local[5];
        }
        return total;
    }
    function getSubscriptions(){
        const local = data[selectedCategory].Subscriptions;
        let total = 0.0;
        if(local[3] !== null){
            total = local[3] * 0.05;
        }
        return total;
    }
    function checkCompleted(){
        const imp = data[selectedCategory].Impressions;
        const sub = data[selectedCategory].Subscriptions;
        const reg = data[selectedCategory].Registrations;
        if(imp.every(value => value !== null)){
            funnelImpressions.classList.remove("bg-zinc-500");
            funnelImpressions.classList.add("bg-lime-600");
        }
        if(sub[3] !== null){
            funnelSubscriptions.classList.remove("bg-zinc-500");
            funnelSubscriptions.classList.add("bg-lime-600");
        }
        if(reg[4] !== null){
            funnelRegistrations.classList.remove("bg-zinc-500");
            funnelRegistrations.classList.add("bg-lime-600");
        }
    }
    function getData(){
        const impressions = getImpressions();
        const registrations = getRegistrations();
        const sub = getSubscriptions();
        const a1 = document.querySelector(".a1");
        const a2 = document.querySelector(".a2");
        const a3 = document.querySelector(".a3");
        
        if(impressions != 0){
            a1.textContent = new Intl.NumberFormat().format(impressions);
            funnelImpressions.classList.remove("bg-zinc-500");
            funnelImpressions.classList.add("bg-lime-600");
        }else{
            a1.textContent = '';
            funnelImpressions.classList.add("bg-zinc-500");
            funnelImpressions.classList.remove("bg-lime-600");
        }
        if(registrations != 0 && impressions != 0){
            a2.textContent = new Intl.NumberFormat().format(registrations*impressions);
            funnelRegistrations.classList.remove("bg-zinc-500");
            funnelRegistrations.classList.add("bg-lime-600");
        }else{
            a2.textContent = '';
            funnelRegistrations.classList.add("bg-zinc-500");
            funnelRegistrations.classList.remove("bg-lime-600");
        }
        if(sub != 0 && registrations != 0 && impressions !=0){
            a3.textContent = new Intl.NumberFormat().format(registrations*impressions*sub);
            funnelSubscriptions.classList.remove("bg-zinc-500");
            funnelSubscriptions.classList.add("bg-lime-600");
        }else{
            a3.textContent = '';
            funnelSubscriptions.classList.add("bg-zinc-500");
            funnelSubscriptions.classList.remove("bg-lime-600");
        }
        if(impressions !=0 && sub !=0 && registrations !=0){
            btn.classList.remove("hidden");
        }else{
            btn.classList.add("hidden");
        }
        return [impressions, registrations*impressions, registrations*impressions*sub];
    }

    fakeLoader();
    
});
