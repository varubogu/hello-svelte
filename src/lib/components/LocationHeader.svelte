<script lang="ts">
    export let locationName: string;
</script>

<div class="mb-6">
    <div class="flex items-center mb-2">
        <a href="/" class="text-blue-600 hover:text-blue-800 mr-2">
            ← ホームに戻る
        </a>
    </div>
    <h2 class="text-2xl font-bold text-gray-800">
        {locationName}の天気予報
    </h2>
</div>