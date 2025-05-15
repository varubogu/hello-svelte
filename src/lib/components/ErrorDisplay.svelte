<script lang="ts">
    export let message: string | number = 'エラーが発生しました';
    export let statusCode: number = 500;
</script>

<div class="bg-red-50 border border-red-200 rounded-lg p-6 my-8 text-center">
    <h2 class="text-2xl font-bold text-red-700 mb-2">エラー {statusCode}</h2>
    <p class="text-red-600">{message}</p>
    <a href="/" class="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        ホームに戻る
    </a>
</div>