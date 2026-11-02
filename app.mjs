// 渡された引数を元に未完了のリストをるくる
const createIncompleteList = (todo) => {
    // li生成
    const li = document.createElement("li");

    // div生成
    const div = document.createElement("div");
    div.className = "list-row";

    // p生成
    const p = document.createElement("p");
    p.className = "todo-items";
    p.innerText = todo;

    div.appendChild(p);
    li.appendChild(div);

    // button(完了)生成
    const completeButton = document.createElement("button");
    completeButton.innerText = "完了";
    completeButton.addEventListener("click", () => {
        const moveTarget = completeButton.closest("li");
        completeButton.nextElementSibling.remove();
        completeButton.remove();
        
        // 戻すボタン
        const backButton = document.createElement("button");
        backButton.innerText = "戻す";

        moveTarget.firstElementChild.appendChild(backButton);

        document.getElementById("completed-list").appendChild(moveTarget);

        updateIncompleteCount();
        updateCompleteCount();


        // 戻るボタンのイベントリスナー
        backButton.addEventListener("click", () =>{
            const todoText = backButton.previousElementSibling.innerText;
            createIncompleteList(todoText);
            backButton.closest("li").remove();

            updateIncompleteCount();
            updateCompleteCount();
        });
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "削除";
    deleteButton.addEventListener("click", () => {
        const deleteTarget = deleteButton.closest("li");
        document.getElementById("incompleted-list").removeChild(deleteTarget);
    });

    div.appendChild(completeButton);
    div.appendChild(deleteButton);
    
    document.getElementById("incompleted-list").appendChild(li);  
    
    updateIncompleteCount();
    updateCompleteCount();
};

// 未完了のTodoの数を更新する関数
const updateIncompleteCount = () => {
    const count = document.getElementById("incompleted-list").childElementCount;
    document.getElementById("incompleted-count").innerText = `残り: ${count}`;
}


// 完了したTodoの数を更新する関数
const updateCompleteCount = () => {
    const count = document.getElementById("completed-list").childElementCount;
    document.getElementById("completed-count").innerText = `完了数: ${count}`;
    console.log(`完了数: ${count}`);
}

const onClickAdd = () => {
    // テキストボックスの値を取得し、初期化する
    const inputText = document.getElementById("add-text").value;
    document.getElementById("add-text").value = "";
     
    createIncompleteList(inputText);
}

document.getElementById("add-button").addEventListener("click", onClickAdd);
