// Creation of selectHtml - Populating the drop down list
function createSelectHtml(arrayRec){
    let html = `<option value="0">Select a recipe</option>`;
    let htmlArray = [];
    htmlArray.push(html);
    if(arrayRec != []){
        for(let i=0; i < arrayRec.length; i++){
                                    
            let tempVal = arrayRec[i][0];
            let tempStr = arrayRec[i][1];
            html = `<option value="${tempVal}">${tempStr}</option>`; 
            htmlArray.push(html);
        }                           
    }
    console.log(html);
      return htmlArray;  
}

//Creation of displayRecipeHtml - supplying the template literal for rendering the recipes
function createDispReciHtml(id, name, time, serving, ingred, prep){
    let html1 = `<section id="recipeDisplay" data-id="${id}">
    <div class="list">
        <label for='recipeId'>Recipe Id: </label>
        <output id="recipeId">"${id}"</output>
    </div>
    <div class="list">
        <label for='recipeName'>Recipe Name:  </label>
        <output id="recipeNameOutput">"${name}"</output>
    </div>                    
    <div class="list">
        <label for='time'>Time to cook: </label>
        <output id="time">"${time}"</output>
    </div>
    <div class="list">
        <label for='servings'>Servings: </label>
        <output id="servings">"${serving}"</output>
    </div>
    <div class="list">
        <label for='ingred'>Ingredients: </label>
        <output id="ingred">"${ingred}"</output>
    </div>
    <div class="list">
        <label for='prep'>Preparation: </label>
        <output id="prep">"${prep}"</output>
    </div>
    <div>
        <button type="submit" style="margin-left:25%; margin-top:10%;" class="closeBtn" style="display:none">Close</button>
        <button type="submit" style="margin-left:20%; margin-top:5%;" class="deleteBtn">Delete</button>
    </div>                                    
</section>`;
return html1;
}

//Creation of enterNewReciHtml
function createEntNewReciHtml(){
    let html2 = `<form id="newRecipeForm">
    <div class="list">
        <label for='recipeName'>Recipe Name: </label>
        <input type="text" id="recipeName" placeholder="Enter the name of recipe">
    </div>                    
    <div class="list">
        <label for='time'>Time to cook:</label>
        <input type="text" id="time" placeholder="Enter the time required">
    </div>
    <div class="list">
        <label for='servings'>Servings:</label>
        <input type="text" id="servings" placeholder="Enter the number of servings">
    </div>
    <div class="list">
        <label for='ingred'>Ingredients:</label><br>
        <textarea id="ingred" row="4" cols="45" placeholder="Enter the Ingredients with their quantities"></textarea>
    </div>
    <div class="list">
        <label for='preparation'>Preparation:</label><br>
        <textarea id="prep" placeholder="Enter the preparation steps" row="25" cols="45"></textarea>
    </div>
    <div>
        <button type="reset" style="margin-left:15%; margin-top:5%;" class="newRecipeClearBtn" id="newRecipeClearBtn">Clear</button>
        <button type="submit" style="margin-left:15%; margin-top:5%;" class="newRecipeSaveBtn" id="newRecipeSaveBtn">Click to Save</button>
    </div>                    
</form>`;
return html2;
}

// Class 
class RecipeClass{
    constructor(recipeId = 0){
        this._recipes = [];
        this._recipeId = recipeId;
    }

    get recipeId(){
        return this._recipeId;
    }

    get recipes() {
        return this._recipes;
    } 
    
    incrementRecipeId(){
        this._recipeId += 1;
        return this._recipeId;
    }

    //function for adding recipe to the recipes array
    addRecipe(recname, rectime, recservings, recingredients, recpreparation){
        const recipe={};
        let id = this.incrementRecipeId();        
        recipe.Id = id;
        recipe.Name = recname;
        recipe.Time = rectime;
        recipe.Servings = recservings;
        recipe.Ingredients = recingredients;
        recipe.Preparation = recpreparation;
        this._recipes.push(recipe);
    }

    //function for storing the recipe in the Local storage
    saveJSON(){
        let recipeJson = JSON.stringify(this._recipes);
        localStorage.setItem("recipes", recipeJson);
        console.log(recipeJson);
        let currReciId = JSON.stringify(this._recipeId);
        console.log(currReciId);
        localStorage.setItem("recipeId", currReciId);
    }

    //function for retrieving the the recipe from the Local storage
    loadJSON(){
        const recipeJson = localStorage.getItem('recipes');
        if(recipeJson != null){
            this._recipes = JSON.parse(recipeJson);
            console.log(this._recipes); //loaded data into this._recipes from LocaleStorage
            const stringRecipeId = localStorage.getItem("recipeId");
            this._recipeId = parseInt(stringRecipeId);
            console.log(this._recipes);
        }
    }

    // function for populating the drop down list and rendering it
    renderSelectList(){
        const recipeNameArray = [];
        let selectHtml = "";
        
        for(const rec of this._recipes){
            const tempArray = [];
            tempArray.push(rec.Id);
            console.log(`The id is ${rec.Id}`);
            tempArray.push(rec.Name);
            console.log(`The name is ${rec.Name}`);
            recipeNameArray.push(tempArray);
            console.log(recipeNameArray);            
        }
        selectHtml = createSelectHtml(recipeNameArray);
        console.log(selectHtml);
        const reciArray = [];
        reciArray.push(selectHtml);
        let tempString = reciArray.join('\n');
        let targetHtmlArea = document.getElementById('recipeListId');
        console.log(tempString);
        console.log(this._recipes);
        targetHtmlArea.innerHTML = tempString;
    }

    //function for rendering the selected recipe from the drop list
    renderRecipe(){
        // let displayreci = document.getElementById('displayAndEntry');
        // displayreci.innerHTML = "";//clearing any old displayed recipe
        //
        let selectRec = parseInt(document.getElementById("recipeListId").value);//value from the Select element -selected option
        console.log(selectRec);
        console.log(typeof selectRec);
        const recipeJson = localStorage.getItem('recipes');
        this._recipes = JSON.parse(recipeJson);
        let temphtml="";
        console.log(this._recipes);
        if (selectRec != "" && selectRec !== 0){            
            for(const recp of this._recipes){
                
                if(recp.Id === selectRec){
                    temphtml = createDispReciHtml(recp.Id, recp.Name, recp.Time, recp.Servings, recp.Ingredients, recp.Preparation);
                    console.log(recp);
                }
            }
            let displayrec = document.getElementById('newRecipeForm');
            displayrec.style.display = "none";
            let displayrec3 = document.getElementById('recipeListBtn');
            displayrec3.disabled = true;
            let displayreci2 = document.getElementById('displayAndEntry');
            displayreci2.innerHTML = temphtml;
        }              
    }

    //function for rendering new form for a new recipe
    renderNewRecipe(){
        // let tempNewHtml = createEntNewReciHtml();
        // let displayrec = document.getElementById('displayAndEntry');
        // displayrec.innerHTML = tempNewHtml;
        let displayrec = document.getElementById('newRecipeForm');
        displayrec.style.display = "block";
    }

    deleteRecipe(parenId){
        let tempId = Number(parenId);
        for(let i=0; i< this._recipes.length; i++){
            if(this._recipes[i].Id === tempId){
                this._recipes.splice(i, 1);                
            }
        }
        this.saveJSON();
        this.renderSelectList();
        resetWebPage();        
    }
    
}

//Initiation of the class object and the loading of the available data
const recipeClass = new RecipeClass(0);
console.log(recipeClass.recipes);
recipeClass.loadJSON();
recipeClass.renderSelectList();

//function to reset the web page.
function resetWebPage(){    
    location.reload();
}


//-------Grabbing or linking to the elements on the Web page-----
//---New Recipe Form Elements
let newRecipBtn = document.getElementById('newRecipeBtn');
let newRecipeName = document.getElementById('recipeName');
let newRecipeTime = document.getElementById('time');
let newRecipeServings = document.getElementById('servings');
let newRecipeIngredients = document.getElementById('ingred');
let newRecipePreparation = document.getElementById('prep');
let newRecipeSaveBtn = document.getElementById('newRecipeSaveBtn');
let newRecipeClearBtn = document.querySelector('#newRecipeClearBtn');

//---Display Recipe Output Elements
let listRecipeListBtn = document.getElementById('recipeListBtn');
let listRecipeId = document.querySelector('#recipeId');
let listRecipeName = document.querySelector('#recipeNameOutput');
let listRecipeTime = document.getElementById('reciOutTime');
let listRecipeServings = document.getElementById('reciOutServings');
let listRecipeIngred = document.getElementById('reciOutIngred');
let listRecipePrep = document.getElementById('reciOutPrep');
let SpecialBtn = document.getElementById('displayAndEntry');

//Validation and Saving of new Recipe
let validRecipe = false;
const newRecipeSave =()=>{
    
    //Validation 
    if(newRecipeName.value !== ""){validRecipe = true;}
    else{validRecipe = false;
        newRecipeName.style.border = "1px solid red";}

    if(newRecipeTime.value !== ""){validRecipe = true;}
    else{validRecipe = false;
    newRecipeName.style.border = "1px solid red";}

    if(newRecipeServings.value !== ""){validRecipe = true;}
    else{validRecipe = false;
    newRecipeServings.border = "1px solid red";}

    if(newRecipeIngredients.value !== ""){validRecipe = true;}
    else{validRecipe = false;
    newRecipeIngredients.border = "1px solid red";}

    if(newRecipePreparation.value !== ""){validRecipe = true;}
    else{validRecipe = false;
    newRecipePreparation.border = "1px solid red";}
    // let validRecipe = true;
    //Saving of the Recipe details
    if(validRecipe === true){
        recipeClass.addRecipe(newRecipeName.value, newRecipeTime.value, newRecipeServings.value, newRecipeIngredients.value, newRecipePreparation.value);        
        recipeClass.renderSelectList();
        recipeClass.saveJSON();
        newRecipeClear();
        //console.log(recipeClass.recipes);
        //console.log(recipeClass.recipeId);
        //console.log(recipeClass.renderSelectList());
    }
    else{}
}

//Clearing the new Recipe Form fields
const newRecipeClear = ()=>{
    newRecipeName.value = "";
    newRecipeName.style.border = "1px solid black";

    newRecipeTime.value = "";
    newRecipeTime.style.border = "1px solid black";

    newRecipeServings.value = "";
    newRecipeServings.border = "1px solid black";

    newRecipeIngredients.value = "";
    newRecipeIngredients.border = "1px solid black";

    newRecipePreparation.value = "";
    newRecipePreparation.border = "1px solid black";
}

//----Click Event Listeners ----

listRecipeListBtn.addEventListener('click', recipeClass.renderRecipe);
listRecipeListBtn.addEventListener('click', (event)=>{
    event.preventDefault();
});
newRecipBtn.addEventListener('click', recipeClass.renderNewRecipe );
newRecipBtn.addEventListener('click', (event)=>{
    event.preventDefault();
});
newRecipeSaveBtn.addEventListener('click', newRecipeSave);
newRecipeSaveBtn.addEventListener('click', (event)=>{
    event.preventDefault();
});
newRecipeClearBtn.addEventListener('click', newRecipeClear);
newRecipeClearBtn.addEventListener('click', (event)=>{
    event.preventDefault();
});
SpecialBtn.addEventListener('click', (event) =>{
    console.log(event.target.classList);
    //Delete button on the recipe display output
    if(event.target.classList.contains('deleteBtn')){
        const parentElem = event.target.parentElement.parentElement; // Accessing the grandparent of the event.target element
        console.log(parentElem);
        const parentId = (parentElem.dataset.id);
        console.log(parentId);
        recipeClass.deleteRecipe(parentId);
    }
    if(event.target.classList.contains('closeBtn')){
        const parentElem = event.target.parentElement.parentElement; // Accessing the grandparent of the event.target element
        console.log(parentElem);
        const parentId = (parentElem.dataset.id);
        console.log(parentId);
        //recipeClass.deleteRecipe(parentId);
        resetWebPage();
    }    
});


