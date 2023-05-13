<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input v-model="completed" type="checkbox" @change="doneEdit" />
            <div
                v-if="!editing"
                @dblclick="editTodo"
                class="todo-item-label"
                :class="{ completed: completed }"
            >
                {{ title }}
            </div>
            <input
                v-else
                class="todo-item-edit"
                type="text"
                v-model="title"
                @blur="doneEdit"
                @keyup.enter="doneEdit"
                @keyup.esc="cancelEdit"
                v-focus
            />
        </div>
        <div class="remove-item" @click="removeTodo(todo.id)">
            <div class="icon-trash" style="float: left">
                <div class="trash-lid" style="background-color: #2cc3b5"></div>
                <div
                    class="trash-container"
                    style="background-color: #2cc3b5"
                ></div>
                <div class="trash-line-1"></div>
                <div class="trash-line-2"></div>
                <div class="trash-line-3"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true,
        },
        checkAll: {
            type: Boolean,
            required: true,
        },
    },
    watch: {
        checkAll() {
            if(this.checkAll) {
                this.completed =true
            }
            else {
                this.completed = this.todo.completed
            }
        }
    },
    data() {
        return {
            id: this.todo.id,
            title: this.todo.title,
            completed: this.todo.completed,
            editing: this.todo.editing,
            lastTitle: '',
        };
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus();
            },
        },
    },
    methods: {
        removeTodo(id) {
            this.eventBus.$emit('removeTodo', id);
        },
        editTodo() {
            if (this.completed == true) {
                this.editing = false;
            } else {
                this.lastTitle = this.title;
                this.editing = true;
                this.eventBus.$emit('editingTodo', {
                id: this.id,
                title: this.title,
                completed: this.completed,
                editing: this.editing,
            });
            }
        },
        doneEdit() {
            if (this.title.trim().length == 0) {
                this.title = this.lastTitle;
            }
            this.editing = false;
            this.eventBus.$emit('finishEdit', {
                id: this.id,
                title: this.title,
                completed: this.completed,
                editing: this.editing,
            });
        },
        cancelEdit() {
            this.title = this.lastTitle;
            this.editing = false;
        },
    },
};
</script>
