const steps = document.querySelectorAll(".stp");
const circlesSteps = document.querySelectorAll(".step");
const formInputs = document.querySelectorAll(".step-1 form input");
const plans = document.querySelectorAll(".plan-card");
const switcher = document.querySelector(".switch");
const addons = document.querySelectorAll(".box");
const total = document.querySelectorAll(".total b");
const planPrice = document.querySelectorAll(".plan-price");

let currentStep = 1;
let currentCircle = 0;

let planDetails = {
    name: null,
    price: null,
    type: null,
}

let addOn = {
    name: null,
    price: null,
}

let iDs = [];

steps.forEach(step => {
    const nextBtn = step.querySelector(".next-step");
    const prevBtn = step.querySelector(".prev-step");
    if (nextBtn)
    {
        nextBtn.addEventListener("click", ()=>{
            document.querySelector(`.step-${currentStep}`).style.display = "none";
            circlesSteps[currentCircle].classList.remove("active");
            if (currentStep < 5 && validateInput(currentStep))
            {
                currentStep++;
                currentCircle++;
            }
            document.querySelector(`.step-${currentStep}`).style.display = "flex";
            if (currentCircle < 4)
                circlesSteps[currentCircle].classList.add("active");
            if (currentStep === 2)
                selectPlans();
            console.log("name: " + planDetails.name + " | price: " + planDetails.price +  " | type: " + planDetails.type);
            if (currentStep === 3)
                addOnsStep();
            if (currentStep === 4)
                setTotal();
        })
    }
    if (prevBtn)
    {
        prevBtn.addEventListener("click", () => {
            document.querySelector(`.step-${currentStep}`).style.display = "none";
            circlesSteps[currentCircle].classList.remove("active");
            currentStep--;
            currentCircle--;
            document.querySelector(`.step-${currentStep}`).style.display = "flex";
            circlesSteps[currentCircle].classList.add("active");
        })
    }
})


function storeAddOns()
{
    for (let i = 0; i < addons.length; i++)
    {
        //we are here
    }
}

function setTotal()
{
    if (iDs.length > 0)
        storeAddOns();

}


function addOnsStep()
{
    addons.forEach(addon => {
        let checkBox = addon.querySelector(".online");
        addon.addEventListener("click", () => {
            checkBox.checked = !checkBox.checked
            if (checkBox.checked){
                addon.classList.add("selected-addons");
                let addonID = addon.getAttribute("data-id");
                iDs.push(addonID);
            }
            else
            {
                let addonID = addon.getAttribute("data-id");
                addon.classList.remove("selected-addons")
                iDs = iDs.filter(id => id !== addonID);
            }
        })
    })

    
}

function selectPlans()
{
    let planPrice = "$9/mo";
    let planName = "Arcade";
    planDetails.name = planName;
    planDetails.price = planPrice;
    planDetails.type = false;
    plans.forEach(plan => {
        plan.addEventListener("click", () => {
            document.querySelector(".selected").classList.remove("selected");
            plan.classList.add("selected")
            planName = plan.querySelector("b");
            planPrice = plan.querySelector("span");
            planDetails.name = planName.textContent;
            planDetails.price = planPrice.textContent;
        })
    })

    //switcher event hook
    switcher.addEventListener("click", () => {
        const val = switcher.querySelector("input").checked;
        if (val === true)
        {
            plans.forEach(plan => {
                plan.querySelector(".bonus").style.display = "flex";
            })
            plans[0].querySelector("span").textContent = "$19/mo";
            plans[1].querySelector("span").textContent = "$25/mo";
            plans[2].querySelector("span").textContent = "$30/mo";
            planDetails.type = true;
        }
        if (val === false)
        {
            planDetails.type = false
            plans[0].querySelector("span").textContent = "$9/mo";
            plans[1].querySelector("span").textContent = "$12/mo";
            plans[2].querySelector("span").textContent = "$20/mo";
            plans.forEach(plan => {
                plan.querySelector(".bonus").style.display = "none";
            })
        }
    })
}


function isValidPhoneNumber(phone)
{
    const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return pattern.test(String(phone));
}

function isEmailValid(email)
{
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(String(email).toLowerCase());
}

function validateInput(step)
{
    if (step === 1)
    {
        const nameValue = formInputs[0].value.trim();
        const emailValue = formInputs[1].value.trim();
        const phoneValue = formInputs[2].value.trim();
    
        let EmaleFlag = true;
        let nameFlag = true;
        let phoneFlag = true;
        if (nameValue === ''){
            formInputs[0].nextElementSibling.style.display = "flex";
            nameFlag = false
        }
        else{
            if (String(nameValue).length < 3){
                formInputs[0].nextElementSibling.style.display = "flex";
                formInputs[0].nextElementSibling.textContent = "Please Enter a valid name!";
                nameFlag = false;
            }
            else{
                formInputs[0].nextElementSibling.style.display = "none";
                nameFlag = true
            }
        }
        if (emailValue === ''){
            formInputs[1].nextElementSibling.style.display = "flex";
            EmaleFlag = false;
        }
        else{
            if (!isEmailValid(emailValue)){
                formInputs[1].nextElementSibling.style.display = "flex"
                formInputs[1].nextElementSibling.textContent = "Email not valid";
                EmaleFlag = false;
            }
            else{
                formInputs[1].nextElementSibling.style.display = "none";
                EmaleFlag = true
            }
        }
        if (phoneValue === '')
        {
            formInputs[2].nextElementSibling.style.display = "flex";
            phoneFlag = false;
        }
        else
        {
            if (!isValidPhoneNumber(phoneValue)){
                formInputs[2].nextElementSibling.display = "flex";
                formInputs[2].nextElementSibling.textContent = "Please Enter a valid phone number!";
                phoneFlag = false;
            }
            else{
                formInputs[2].nextElementSibling.style.display = "none";
                phoneFlag = true;
            }
        }
        if (!EmaleFlag || !nameFlag || !phoneFlag)
            return false;
    }
    return true;
}
