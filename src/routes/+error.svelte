<script>
    export let status;
    export let error;
</script>

<h1>エラーが発生しました</h1>
<p>ステータスコード: {status}</p>
<p>メッセージ: {error?.message}</p>
