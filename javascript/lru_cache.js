class Node {
  constructor(data = null, key = null, next = null, prev = null) {
    this.data = data;
    this.key = key;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
  }

  // ADD THE NODE TO THE HEAD OF THE LIST
  addHead(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }

    node.next = this.head
    this.head.prev = node;
    this.head = node;
    this.head.prev = null
  }

  // REMOVE THE TAIL NODE FROM THE LIST
  // AND RETURN IT
  removeTail() {
    if (!this.tail) {
      return this.tail;
    }

    const oldTail = this.tail
    this.tail = this.tail.prev
    
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    return oldTail
  }

  // REMOVE THE GIVEN NODE FROM THE LIST
  // AND THEN RETURN IT
  removeNode(node) {
    if (this.tail === node) {
      return this.removeTail
    }
    
    if (this.head === node) {
      this.head = this.head.next
      if (this.head) {
        this.head.prev = null;
      }
      if (!this.head || !this.head.next) {
        this.tail = this.head
      }
      return node;
    }

    if (node.prev) {
      node.prev.next = node.next
    }

    if (node.next) {
      node.next.prev = node.prev
    }

    return node;
  }

  // MOVE THE GIVEN NODE FROM ITS LOCATION TO THE HEAD
  // OF THE LIST
  moveNodeToHead(node) {
    if (this.head === node) {
      return;
    }
    this.removeNode(node)
    this.addHead(node)
  }
}

class LRUCache {
  constructor(limit = 10) {
    this.limit = limit;
    this.size = 0;
    this.hash = {};
    this.list = new DoublyLinkedList();
  }

  // RETRIEVE THE NODE FROM THE CACHE USING THE KEY
  // IF THE NODE IS IN THE CACHE, MOVE IT TO THE HEAD OF THE LIST AND RETURN IT
  // OTHERWISE RETURN -1
  get(key) {
    if (this.hash[key]) {
      this.list.moveNodeToHead(this.hash[key])
      return this.hash[key]
    }
    return -1;
  }

  // ADD THE GIVEN KEY AND VALUE TO THE CACHE
  // IF THE CACHE ALREADY CONTAINS THE KEY, UPDATE ITS VALUE AND MOVE IT TO 
  // THE HEAD OF THE LIST
  // IF THE CACHE DOESN'T CONTAIN THE KEY, ADD IT TO THE CACHE AND PLACE IT
  // AT THE HEAD OF THE LIST
  // IF THE CACHE IS FULL, REMOVE THE LEAST RECENTLY USED ITEM BEFORE ADDING
  // THE NEW DATA TO THE CACHE
  put(key, value) {
    
    if (this.hash[key]) {
      this.hash[key].data = value
      this.list.moveNodeToHead(this.hash[key])
      return;
    }
    
    if (this.size === this.limit) {
      const tail = this.list.removeTail()
      delete this.hash[tail.key]
      this.size -= 1;
    }
    
    const node = new Node(value, key)
    this.hash[key] = node;
    this.list.addHead(node);
    this.size += 1;
  }
}

if (require.main === module) {
  // add your own tests in here
  //data = null, key = null, next = null, prev = null
  const node1 = new Node(1, "one")
  const node2 = new Node(2, "two")
  const node3 = new Node(3, "three")
  const list = new DoublyLinkedList()

  console.log("")
  console.log("Expecting null values:",)
  console.log(list);

  console.log("")
  console.log("Expecting tail and head to be same node:")
  list.addHead(node1)
  console.log(list.head === list.tail)

  console.log("")
  console.log("Expecting tail and head to be differnt nodes:")
  list.addHead(node2)
  console.log(list.head !== list.tail)

  console.log("")
  console.log("Expecting head value to be node2:")
  console.log(list.head.data === node2.data)

  console.log("")
  console.log("Expecting tail value to be node1:")
  console.log(list.tail.data === node1.data)

  console.log("")
  console.log("Expecting tail to be node1:")
  console.log(list.removeTail() === node1)
  
  console.log("")
  console.log("Expecting new tail to be node2:")
  console.log(list.tail === node2);

  console.log("")
  console.log("Expecting after tail removal to be the same node:")
  console.log(list.head === list.tail)

  console.log("")
  console.log("Expecting removed node to be node1:")
  console.log(list.removeNode(node2) === node2)
  
  console.log("")
  console.log("Expecting after removal of node to have null values:")
  console.log(list.head === null && list.tail === null)

  list.addHead(node1)
  list.addHead(node2)
  list.addHead(node3)

  console.log("Expecting new tail to be node2")
  list.removeNode(node1)
  console.log(list.tail === node2)
  list.removeTail()
  list.removeTail()
  

  console.log("")
  list.addHead(node1)
  list.addHead(node2)
  list.addHead(node3)
  console.log("Expecting node3 next value to be node1 when node2 is removed:")
  list.removeNode(node2)
  console.log(list.head.next === node1)

  console.log("")
  console.log("")
  console.log("")
  console.log("")
  console.log("")
  console.log("")
  console.log("")
  console.log("")
}

module.exports = {
  Node,
  DoublyLinkedList,
  LRUCache
};

// Please add your pseudocode to this file
// And a written explanation of your solution
