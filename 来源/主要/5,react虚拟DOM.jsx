import React, { Component } from 'react'
adadadada1111111111111111111111111111111111111gengxin
export default class VerDOM extends Component {
    state = { name: "张三" }
    constructor(props) {
        super(props);
        // 虚拟DOM实现流程一: 在组件初始化时, 把DOM树标签结构转化为js对象结构
        console.log(1, this.render())
        this.oldVirtualDOM = this.render()
    }
    
    setName = ()=>{
        // this.setState({name: "李四"})
        
        // 下边用模拟实现react底层虚拟DOM更新
        this.state.name = "李四"

        // 虚拟DOM实现流程二: 在setState函数内部,更新state数据后,再次生成新的虚拟DOM
        this.NewVirtualDOM = this.render() 
        // 因为在数据更新后需要重新调用render生成新的虚拟DOM对象, 所以数据更新时,render会执行
        console.log(this.oldVirtualDOM, this.NewVirtualDOM)
        // 由此可见,当state数据更新时,直接导致的就是虚拟DOM树中的数据发生变化
         
        // 虚拟DOM实现流程三: 把更新前的老虚拟dom树,和更新后的新虚拟DOM树,都传入底层diff函数中, 通过虚拟dom节点对比,得到新老dom树之间的不同之处, 把所有区别点返回到一个patch对象中
        React.diff = function(){}  // 模拟操作,防止报错
        var patch = React.diff(this.oldVirtualDOM, this.NewVirtualDOM) // 模拟操作
        patch = {   // 模拟操作
            diffrients: [
                {
                    key: "3",
                    type: "button",
                    selector: ".DOM button",
                    children: this.state.name
                }
            ]
        }

        // 虚拟DOM实现流程四: 根据patch对象中找到的不同点,针对想的找到真实DOM中的标签, 更新这些标签, 实现DOM的局部更新
        patch.diffrients.forEach(item=>{
            document.querySelector(item.selector).innerText = item.children
        })
        

    }
    render() {
        // return (
        //     <div className="DOM">
        //         <h1 className="title">这是虚拟DOM页</h1>
        //         <button onClick={this.setName}>{this.state.name}</button>
        //     </div>
        // )
        
        // 模拟实现react底层虚拟DOM把html标签树结构转化为js对象结构

        return React.createElement(
           "div",
           {
                key: "1",
                className: "DOM",
                children: [
                    React.createElement(
                        "h1",
                        {
                            key: "2",
                            className: "title",
                            children: "这是虚拟DOM页"
                        }
                    ),
                    React.createElement(
                        "button",
                        {
                            key: "3",
                            onClick: this.setName,
                            children: this.state.name
                        }
                    )
                ]
           }
        )
    }
}
