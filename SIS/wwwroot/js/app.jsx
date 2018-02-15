const CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                Hello World !!
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);