document.addEventListener("DOMContentLoaded", function() {
    const dataStructureSelect = document.getElementById("data-structure-select");
    const linkedListContainer = document.getElementById("linked-list-container");
    const stackContainer = document.getElementById("stack-container");
    const queueContainer = document.getElementById("queue-container");
    const feedback = document.getElementById("feedback");

    dataStructureSelect.addEventListener("change", function() {
        const value = dataStructureSelect.value;
        linkedListContainer.style.display = "none";
        stackContainer.style.display = "none";
        queueContainer.style.display = "none";
        feedback.style.display = "none";

        if (value === "linked-list") {
            linkedListContainer.style.display = "block";
        } else if (value === "stack") {
            stackContainer.style.display = "block";
        } else if (value === "queue") {
            queueContainer.style.display = "block";
        }
    });

    function showFeedback(message, type = 'info') {
        feedback.innerText = message;
        feedback.style.display = "block";
        feedback.style.backgroundColor = type === 'error' ? 'red' : '#61dafb';
    }

    function updateCodeBlock(containerId, cppCode, javaCode) {
        const cppBlock = document.getElementById(containerId + '-cpp');
        const javaBlock = document.getElementById(containerId + '-java');
        cppBlock.innerText = cppCode;
        javaBlock.innerText = javaCode;
    }

    // Linked List
    const linkedList = document.getElementById("linked-list");
    const addButton = document.getElementById("add-node-button");
    const removeButton = document.getElementById("remove-node-button");
    const clearButton = document.getElementById("clear-list-button");
    const searchButton = document.getElementById("search-node-button");
    const searchInput = document.getElementById("search-input");
    const linkedListValueInput = document.getElementById("linked-list-value");
    let nodeCount = 0;

    addButton.addEventListener("click", addNode);
    removeButton.addEventListener("click", removeNode);
    clearButton.addEventListener("click", clearList);
    searchButton.addEventListener("click", searchNode);

    function addNode() {
        const value = linkedListValueInput.value.trim();
        if (value === "") {
            showFeedback("Please enter a value", 'error');
            return;
        }
        nodeCount++;
        
        const newNode = document.createElement("div");
        newNode.className = "node";
        newNode.innerText = value;
        newNode.style.transform = "scale(0)";
        
        const newArrow = document.createElement("div");
        newArrow.className = "arrow";
        
        if (nodeCount > 1) {
            linkedList.appendChild(newArrow);
        }
        linkedList.appendChild(newNode);

        linkedListValueInput.value = "";
        showFeedback("Node added successfully");
        const { cpp, java } = getLinkedListCode(value, "addNode");
        updateCodeBlock('linked-list-code', cpp, java);

        setTimeout(() => {
            newNode.style.transform = "scale(1)";
        }, 10);
    }

    function removeNode() {
        if (nodeCount === 0) {
            showFeedback("No nodes to remove", 'error');
            return;
        }

        const nodes = linkedList.getElementsByClassName("node");
        const arrows = linkedList.getElementsByClassName("arrow");

        const removedNode = nodes[nodes.length - 1];
        removedNode.style.transform = "scale(0)";
        setTimeout(() => {
            linkedList.removeChild(removedNode);
            if (arrows.length > 0) {
                linkedList.removeChild(arrows[arrows.length - 1]);
            }
            nodeCount--;
            showFeedback("Node removed successfully");
            const { cpp, java } = getLinkedListCode(null, "removeNode");
            updateCodeBlock('linked-list-code', cpp, java);
        }, 300);
    }

    function clearList() {
        const nodes = linkedList.getElementsByClassName("node");
        const arrows = linkedList.getElementsByClassName("arrow");

        if (nodes.length === 0 && arrows.length === 0) {
            showFeedback("No nodes to clear", 'error');
            return;
        }

        for (let i = nodes.length - 1; i >= 0; i--) {
            nodes[i].style.transform = "scale(0)";
            setTimeout(() => {
                linkedList.removeChild(nodes[i]);
                if (i === 0 && arrows.length > 0) {
                    linkedList.removeChild(arrows[0]);
                }
                nodeCount--;
                if (i === 0) {
                    showFeedback("List cleared successfully");
                }
            }, 300 * (nodes.length - i));
        }
        const { cpp, java } = getLinkedListCode(null, "clearList");
        updateCodeBlock('linked-list-code', cpp, java);
    }

    function searchNode() {
        const searchValue = searchInput.value.trim();
        if (searchValue === "") {
            showFeedback("Please enter a value to search", 'error');
            return;
        }

        const nodes = linkedList.getElementsByClassName("node");
        let found = false;

        for (let node of nodes) {
            node.style.backgroundColor = "#61dafb";
        }

        for (let node of nodes) {
            if (node.innerText === searchValue) {
                node.style.backgroundColor = "yellow";
                found = true;
                break;
            }
        }

        if (found) {
            showFeedback("Node found");
            const { cpp, java } = getLinkedListCode(searchValue, "searchNode");
            updateCodeBlock('linked-list-code', cpp, java);
        } else {
            showFeedback("Node not found", 'error');
        }
    }

    // Stack
    const stack = document.getElementById("stack");
    const pushButton = document.getElementById("push-stack-button");
    const popButton = document.getElementById("pop-stack-button");
    const clearStackButton = document.getElementById("clear-stack-button");
    const stackValueInput = document.getElementById("stack-value");
    let stackCount = 0;

    pushButton.addEventListener("click", pushStack);
    popButton.addEventListener("click", popStack);
    clearStackButton.addEventListener("click", clearStack);

    function pushStack() {
        const value = stackValueInput.value.trim();
        if (value === "") {
            showFeedback("Please enter a value", 'error');
            return;
        }
        stackCount++;

        const newNode = document.createElement("div");
        newNode.className = "node";
        newNode.innerText = value;
        newNode.style.transform = "scale(0)";
        stack.insertBefore(newNode, stack.firstChild);

        stackValueInput.value = "";
        showFeedback("Value pushed to stack");
        const { cpp, java } = getStackCode(value, "pushStack");
        updateCodeBlock('stack-code', cpp, java);

        setTimeout(() => {
            newNode.style.transform = "scale(1)";
        }, 10);
    }

    function popStack() {
        if (stackCount === 0) {
            showFeedback("Stack is empty", 'error');
            return;
        }

        const nodes = stack.getElementsByClassName("node");
        const removedNode = nodes[0];
        removedNode.style.transform = "scale(0)";
        setTimeout(() => {
            stack.removeChild(removedNode);
            stackCount--;
            showFeedback("Value popped from stack");
            const { cpp, java } = getStackCode(null, "popStack");
            updateCodeBlock('stack-code', cpp, java);
        }, 300);
    }

    function clearStack() {
        const nodes = stack.getElementsByClassName("node");

        if (nodes.length === 0) {
            showFeedback("Stack is already empty", 'error');
            return;
        }

        for (let i = nodes.length - 1; i >= 0; i--) {
            nodes[i].style.transform = "scale(0)";
            setTimeout(() => {
                stack.removeChild(nodes[i]);
                if (i === 0) {
                    stackCount = 0;
                    showFeedback("Stack cleared successfully");
                }
            }, 300 * (nodes.length - i));
        }
        const { cpp, java } = getStackCode(null, "clearStack");
        updateCodeBlock('stack-code', cpp, java);
    }

    // Queue
    const queue = document.getElementById("queue");
    const enqueueButton = document.getElementById("enqueue-button");
    const dequeueButton = document.getElementById("dequeue-button");
    const clearQueueButton = document.getElementById("clear-queue-button");
    const queueValueInput = document.getElementById("queue-value");
    let queueCount = 0;

    enqueueButton.addEventListener("click", enqueue);
    dequeueButton.addEventListener("click", dequeue);
    clearQueueButton.addEventListener("click", clearQueue);

    function enqueue() {
        const value = queueValueInput.value.trim();
        if (value === "") {
            showFeedback("Please enter a value", 'error');
            return;
        }
        queueCount++;

        const newNode = document.createElement("div");
        newNode.className = "node";
        newNode.innerText = value;
        newNode.style.transform = "scale(0)";
        const newArrow = document.createElement("div");
        newArrow.className = "arrow";

        if (queueCount > 1) {
            queue.appendChild(newArrow);
        }
        queue.appendChild(newNode);

        queueValueInput.value = "";
        showFeedback("Value enqueued");
        const { cpp, java } = getQueueCode(value, "enqueue");
        updateCodeBlock('queue-code', cpp, java);

        setTimeout(() => {
            newNode.style.transform = "scale(1)";
        }, 10);
    }

    function dequeue() {
        if (queueCount === 0) {
            showFeedback("Queue is empty", 'error');
            return;
        }

        const nodes = queue.getElementsByClassName("node");
        const arrows = queue.getElementsByClassName("arrow");
        const removedNode = nodes[0];
        removedNode.style.transform = "scale(0)";

        setTimeout(() => {
            queue.removeChild(removedNode);
            if (arrows.length > 0) {
                queue.removeChild(arrows[0]);
            }
            queueCount--;
            showFeedback("Value dequeued");
            const { cpp, java } = getQueueCode(null, "dequeue");
            updateCodeBlock('queue-code', cpp, java);
        }, 300);
    }

    function clearQueue() {
        const nodes = queue.getElementsByClassName("node");
        const arrows = queue.getElementsByClassName("arrow");

        if (nodes.length === 0 && arrows.length === 0) {
            showFeedback("Queue is already empty", 'error');
            return;
        }

        for (let i = nodes.length - 1; i >= 0; i--) {
            nodes[i].style.transform = "scale(0)";
            setTimeout(() => {
                queue.removeChild(nodes[i]);
                if (i === 0 && arrows.length > 0) {
                    queue.removeChild(arrows[0]);
                }
                queueCount--;
                if (i === 0) {
                    showFeedback("Queue cleared successfully");
                }
            }, 300 * (nodes.length - i));
        }
        const { cpp, java } = getQueueCode(null, "clearQueue");
        updateCodeBlock('queue-code', cpp, java);
    }

    // Initialize by displaying the default selected data structure
    dataStructureSelect.dispatchEvent(new Event("change"));

    // C++ and Java Code Snippets
    function getLinkedListCode(value, action) {
        const addNodeCodeCPP = `
class Node {
public:
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head;
    LinkedList() : head(nullptr) {}
    
    void addNode(int val) {
        Node* newNode = new Node(val);
        if (head == nullptr) {
            head = newNode;
        } else {
            Node* temp = head;
            while (temp->next != nullptr) {
                temp = temp->next;
            }
            temp->next = newNode;
        }
    }
};
LinkedList list;
list.addNode(${value});`;

        const removeNodeCodeCPP = `
void removeNode() {
    if (head == nullptr) return;
    if (head->next == nullptr) {
        delete head;
        head = nullptr;
    } else {
        Node* temp = head;
        while (temp->next->next != nullptr) {
            temp = temp->next;
        }
        delete temp->next;
        temp->next = nullptr;
    }
}
list.removeNode();`;

        const clearListCodeCPP = `
void clearList() {
    while (head != nullptr) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }
}
list.clearList();`;

        const searchNodeCodeCPP = `
bool searchNode(int val) {
    Node* temp = head;
    while (temp != nullptr) {
        if (temp->data == val) return true;
        temp = temp->next;
    }
    return false;
}
bool found = list.searchNode(${value});`;

        const addNodeCodeJava = `
class Node {
    int data;
    Node next;
    Node(int val) {
        data = val;
        next = null;
    }
}

class LinkedList {
    Node head;
    LinkedList() {
        head = null;
    }
    
    void addNode(int val) {
        Node newNode = new Node(val);
        if (head == null) {
            head = newNode;
        } else {
            Node temp = head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
    }
}
LinkedList list = new LinkedList();
list.addNode(${value});`;

        const removeNodeCodeJava = `
void removeNode() {
    if (head == null) return;
    if (head.next == null) {
        head = null;
    } else {
        Node temp = head;
        while (temp.next.next != null) {
            temp = temp.next;
        }
        temp.next = null;
    }
}
list.removeNode();`;

        const clearListCodeJava = `
void clearList() {
    while (head != null) {
        Node temp = head;
        head = head.next;
    }
}
list.clearList();`;

        const searchNodeCodeJava = `
boolean searchNode(int val) {
    Node temp = head;
    while (temp != null) {
        if (temp.data == val) return true;
        temp = temp.next;
    }
    return false;
}
boolean found = list.searchNode(${value});`;

        switch (action) {
            case "addNode":
                return { cpp: addNodeCodeCPP, java: addNodeCodeJava };
            case "removeNode":
                return { cpp: removeNodeCodeCPP, java: removeNodeCodeJava };
            case "clearList":
                return { cpp: clearListCodeCPP, java: clearListCodeJava };
            case "searchNode":
                return { cpp: searchNodeCodeCPP, java: searchNodeCodeJava };
        }
    }

    function getStackCode(value, action) {
        const pushStackCodeCPP = `
class Stack {
public:
    std::vector<int> stack;
    
    void push(int val) {
        stack.push_back(val);
    }
};
Stack stack;
stack.push(${value});`;

        const popStackCodeCPP = `
void pop() {
    if (!stack.empty()) {
        stack.pop_back();
    }
}
stack.pop();`;

        const clearStackCodeCPP = `
void clear() {
    stack.clear();
}
stack.clear();`;

        const pushStackCodeJava = `
class Stack {
    ArrayList<Integer> stack = new ArrayList<>();
    
    void push(int val) {
        stack.add(val);
    }
}
Stack stack = new Stack();
stack.push(${value});`;

        const popStackCodeJava = `
void pop() {
    if (!stack.isEmpty()) {
        stack.remove(stack.size() - 1);
    }
}
stack.pop();`;

        const clearStackCodeJava = `
void clear() {
    stack.clear();
}
stack.clear();`;

        switch (action) {
            case "pushStack":
                return { cpp: pushStackCodeCPP, java: pushStackCodeJava };
            case "popStack":
                return { cpp: popStackCodeCPP, java: popStackCodeJava };
            case "clearStack":
                return { cpp: clearStackCodeCPP, java: clearStackCodeJava };
        }
    }

    function getQueueCode(value, action) {
        const enqueueCodeCPP = `
class Queue {
public:
    std::list<int> queue;
    
    void enqueue(int val) {
        queue.push_back(val);
    }
};
Queue queue;
queue.enqueue(${value});`;

        const dequeueCodeCPP = `
void dequeue() {
    if (!queue.empty()) {
        queue.pop_front();
    }
}
queue.dequeue();`;

        const clearQueueCodeCPP = `
void clear() {
    queue.clear();
}
queue.clear();`;

        const enqueueCodeJava = `
class Queue {
    LinkedList<Integer> queue = new LinkedList<>();
    
    void enqueue(int val) {
        queue.add(val);
    }
}
Queue queue = new Queue();
queue.enqueue(${value});`;

        const dequeueCodeJava = `
void dequeue() {
    if (!queue.isEmpty()) {
        queue.remove();
    }
}
queue.dequeue();`;

        const clearQueueCodeJava = `
void clear() {
    queue.clear();
}
queue.clear();`;

        switch (action) {
            case "enqueue":
                return { cpp: enqueueCodeCPP, java: enqueueCodeJava };
            case "dequeue":
                return { cpp: dequeueCodeCPP, java: dequeueCodeJava };
            case "clearQueue":
                return { cpp: clearQueueCodeCPP, java: clearQueueCodeJava };
        }
    }
});
