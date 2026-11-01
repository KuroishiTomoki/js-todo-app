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

        // 戻るボタンのイベントリスナー
        backButton.addEventListener("click", () =>{
            const todoText = backButton.previousElementSibling.innerText;
            createIncompleteList(todoText);
            backButton.closest("li").remove();
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
};

const onClickAdd = () => {
    // テキストボックスの値を取得し、初期化する
    const inputText = document.getElementById("add-text").value;
    document.getElementById("add-text").value = "";
     
    createIncompleteList(inputText);
}

document.getElementById("add-button").addEventListener("click", onClickAdd);
