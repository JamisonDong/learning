实现ReactSSR

1.引入要渲染的React组件
2.通过renderToString 方法将React 组件转换为HTML字符串
3.将结果HTML字符串响应到客户端


renderToString方法用于将React组件转换为HTML字符串，通过react-dom/server导入