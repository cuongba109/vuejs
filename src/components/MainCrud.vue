<template>
    <div>
        <input
            type="text"
            class="todo-input"
            placeholder="What needs to be done"
            v-model="newTodo"
            @keyup.enter="addTodo"
        />
        <button class="button" v-on:click="addTodo">ADD</button>
        <crud-item
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            :checkAll="!anyRemaining"
        >
        </crud-item>
        <div class="extra-container">
           <crud-check-all :anyRemaining="anyRemaining"> </crud-check-all>
            <crud-remanining :remaining="remaining"></crud-remanining>
        </div>
    </div>
</template>
<script>
import checkString from './utils/validate';
import CrudItem from './CrudItem.vue';
import CrudRemanining from './CrudRemanining.vue';
import CrudCheckAll from './CrudCheckAll.vue';

export default {
    name: 'todo-list',
    components: {
        CrudItem,
        CrudRemanining,
        CrudCheckAll,
    },
    data() {
        return {
            newTodo: '',
            idForTodo: 3,
            lastTitle: '',
            idlist: [],
            todos: [
                {
                    id: 1,
                    title: 'Playing Football',
                    completed: false,
                    editing: false,
                },
                {
                    id: 2,
                    title: 'Swimming',
                    completed: false,
                    editing: false,
                },
            ],
        };
    },
    created(){
        this.eventBus.$on('removeTodo', (id) => this.removeTodo(id))
        this.eventBus.$on('finishEdit', (data) => this.finishEdit(data))
        this.eventBus.$on('editingTodo', (data) => this.editingTodo(data))
        this.eventBus.$on('checkAllChanged', (checked) => this.checkAlltodo(checked))
    },
    computed: {
        remaining() {
            return this.todos.filter((todo) => !todo.completed).length;
        },
        anyRemaining() {
            return this.remaining != 0;
        },
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim().length == 0) {
                alert('Please input what needs to be done');
            } else if (checkString(this.newTodo) == false) {
                alert('Must be string');
            } else if (this.idlist.length > 0) {
                this.todos.push({
                    id: this.idlist[this.idlist.length - 1],
                    title: this.newTodo,
                    completed: false,
                    editing: false,
                });
                this.newTodo = '';
                this.idlist.pop();
            } else {
                this.todos.push({
                    id: this.idForTodo,
                    title: this.newTodo,
                    completed: false,
                    editing: false,
                });
                this.newTodo = '';
                this.idForTodo++;
            }
        },
        removeTodo(id) {
            const index = this.todos.findIndex((item) => item.id == id);
            this.todos.splice(index, 1);
            this.idlist.push(id);
        },
        checkAlltodo() {
            this.todos.forEach(
                (todo) => (todo.completed = event.target.checked),
            );
        },
        finishEdit(data) {
            const index = this.todos.findIndex((item) => item.id == data.id);
            this.todos.splice(index, 1, data);
        },
        editingTodo(data) {
            const index = this.todos.findIndex((item) => item.id == data.id);
            this.todos.splice(index, 1, data);
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.completed {
    text-decoration: line-through;
    color: grey;
}
.todo-item-left {
    display: flex;
    align-items: center;
}
.todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
}
.todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Arial, Helvetica, sans-serif;
}
.extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
.icon-trash {
    width: 48px;
    height: 48px;
    position: relative;
    overflow: hidden;
    margin-left: 25px;
    margin-bottom: 25px;
    margin-top: 25px;
}

.icon-trash .trash-lid {
    width: 62%;
    height: 10%;
    position: absolute;
    left: 50%;
    margin-left: -31%;
    top: 10.5%;
    background-color: #000;
    border-top-left-radius: 80%;
    border-top-right-radius: 80%;
    -webkit-transform: rotate(-5deg);
    -moz-transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    transform: rotate(-5deg);
}

.icon-trash .trash-lid:after {
    content: '';
    width: 26%;
    height: 100%;
    position: absolute;
    left: 50%;
    margin-left: -13%;
    margin-top: -10%;
    background-color: inherit;
    border-top-left-radius: 30%;
    border-top-right-radius: 30%;
    -webkit-transform: rotate(-1deg);
    -moz-transform: rotate(-1deg);
    -ms-transform: rotate(-1deg);
    transform: rotate(-1deg);
}

.icon-trash .trash-container {
    width: 56%;
    height: 65%;
    position: absolute;
    left: 50%;
    margin-left: -28%;
    bottom: 10%;
    background-color: #000;
    border-bottom-left-radius: 15%;
    border-bottom-right-radius: 15%;
}

.icon-trash .trash-container:after {
    content: '';
    width: 110%;
    height: 12%;
    position: absolute;
    left: 50%;
    margin-left: -55%;
    top: 0;
    background-color: inherit;
    border-bottom-left-radius: 45%;
    border-bottom-right-radius: 45%;
}

.icon-trash .trash-line-1 {
    width: 4%;
    height: 50%;
    position: absolute;
    left: 38%;
    margin-left: -2%;
    bottom: 17%;
    background-color: #252527;
}

.icon-trash .trash-line-2 {
    width: 4%;
    height: 50%;
    position: absolute;
    left: 50%;
    margin-left: -2%;
    bottom: 17%;
    background-color: #252527;
}

.icon-trash .trash-line-3 {
    width: 4%;
    height: 50%;
    position: absolute;
    left: 62%;
    margin-left: -2%;
    bottom: 17%;
    background-color: #252527;
}

a {
    position: absolute;
    bottom: 12px;
    right: 20px;
}
.todo-input {
    width: 400px;
    padding: 10px 10px;
    font-size: 18px;
    margin-bottom: 16px;
    margin-left: 12px;

    
}
.todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Avenir', Arial, Helvetica, sans-serif;
}
.remove-item {
    cursor: pointer;
    margin-left: 14px;
    
}
.button {
    background: #ff4742;
    border: 1px solid #ff4742;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-family: nunito, roboto, proxima-nova, 'proxima nova', sans-serif;
    font-size: 16px;
    font-weight: 800;
    line-height: 16px;
    min-height: 40px;
    outline: 0;
    padding: 12px 14px;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
}
.button:hover .button:active {
    background-color: initial;
    background-position: 0 0;
    color: #ff4742;
}

.button:active {
    opacity: 0.5;
}
.button {
    margin-left: 121px;
}
.todo-input {
    font-family: 'Avenir', Arial, Helvetica, sans-serif;
}
</style>
