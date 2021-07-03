// Creation of selectHtml
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

//Creation of displayRecipeHtml
function createDispReciHtml(id, name, time, serving, ingred, prep){
    let html1 = `<section id="recipeDisplay" data-id="${id}">
    <div class="list">
        <label for='recipeId'>Recipe Id: "${id}"</label>
        <output id="recipeId"></output>
    </div>
    <div class="list">
        <label for='recipeName'>Recipe Name: "${name}" </label>
        <output id="recipeNameOutput"></output>
    </div>                    
    <div class="list">
        <label for='time'>Time to cook: "${time}"</label>
        <output id="time"></output>
    </div>
    <div class="list">
        <label for='servings'>Servings: "${serving}"</label>
        <output id="servings"></output>
    </div>
    <div class="list">
        <label for='ingred'>Ingredients: "${ingred}"</label>
        <output id="ingred"></output>
    </div>
    <div class="list">
        <label for='prep'>Preparation: "${prep}"</label>
        <output id="prep"></output>
    </div>
    <div>
        // <button type="submit" style="margin-left:20%; margin-top:10%;" class="editBtn" id="editBtn">Edit & Save</button>
        <button type="submit" style="margin-left:20%; margin-top:5%;" class="deleteBtn" id="deleteBtn">Delete</button>
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
        recipeNameArray.push(selectHtml);
        let tempString = recipeNameArray.join('\n');
        let targetHtmlArea = document.getElementById('recipeListId');
        console.log(tempString);        
        targetHtmlArea.innerHTML = tempString;
    }
    renderRecipe(){
        let selectRec = parseInt(document.getElementById("recipeListId").value);
        console.log(typeof selectRec);
        let temphtml="";
        if (selectRec != "" && selectRec !== 0){            
            for(const recip of this._recipes){
                //console.log(`Hi I am here`);
                if(recip.Id === selectRec){
                    temphtml = createDispReciHtml(recip.Id, recip.Name, recip.Time, recip.Servings, recip.Ingredients, recip.Preparation);
                    console.log(recip);
                }
            }
            let displayreci = document.getElementById('displayAndEntry');
            displayreci.innerHTML = temphtml;
        }        
              
    }
    renderNewRecipe(){
        let tempNewHtml = createEntNewReciHtml();
        let displayrec = document.getElementById('displayAndEntry');
        displayrec.innerHTML = tempNewHtml;
    }
    // renderPicture(){
    //     let tempPhoto = `<img src="./images/indianfood.jpg" />`;
    //     let displayphoto = document.getElementById('displayAndEntry');
    //     console.log(tempPhoto);
    //     displayphoto.innerHTML = tempPhoto;
    // }
    saveJSON(){
        let recipeJson = JSON.stringify(this._recipes);
        localStorage.setItem("recipes", recipeJson);
        let currReciId = JSON.stringify(this._recipeId);
        localStorage.setItem("recipeId", currReciId);
    }
    loadJSON(){
        const recipeJson = localStorage.getItem('recipes');
        if(recipeJson != null){
            this._recipes = JSON.parse(recipeJson);
            console.log(this._recipes); //loaded data into this._recipes from LocaleStorage
            const stringRecipeId = localStorage.getItem("recipeId");
            this._recipeId = parseInt(stringRecipeId);
        }
    }
    // deleteRecipe(recipeId){
        
    // }
}

//Initiation of the class object and the loading of the available data
const recipeClass = new RecipeClass(0);
console.log(recipeClass.recipes);
recipeClass.loadJSON();
recipeClass.renderSelectList();
//recipeClass.


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
let listRecipeDelBtn = document.getElementById('deleteBtn');

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

    //Saving of the Recipe details
    if(validRecipe === true){
        recipeClass.addRecipe(newRecipeName.value, newRecipeTime.value, newRecipeServings.value, newRecipeIngredients.value, newRecipePreparation.value);
        newRecipeClear();
        recipeClass.renderSelectList();
        recipeClass.saveJSON();
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
//Event Listener for <div id="displayAndEntry">
// let reciDisplayEntry = document.getElementById('displayAndEntry');
// reciDisplayEntry.addEventListener('click',(event)=>{
//     console.log(event.target.classList);
//     if(event.target.classList.contains('newRecipeSaveBtn'))
//     {   
//         newRecipeSave();
//     }
//     else if(event.target.classList.contains('newRecipeClearBtn'))
//     {
//         newRecipeClear();
//     }
// });


