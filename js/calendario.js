sidebar = document.getElementById('sidebar');
testbtn = document.getElementById('testbtn');

var isSidebarVisible = true;
testbtn.addEventListener('click', function() {
    if (isSidebarVisible===false){
        sidebar.classList.remove("invisible");
        console.log("change to visible");
        isSidebarVisible=true;
    }
    else if (isSidebarVisible===true){
        sidebar.classList.add("invisible");
        console.log("change to invisible");
        isSidebarVisible=false;
    }
});


