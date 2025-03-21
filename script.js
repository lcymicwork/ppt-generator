document.getElementById('test-siliconflow-button').addEventListener('click', function() {
    console.log('Siliconflow test button clicked'); // Debugging log
    fetch('/test-siliconflow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {
        console.log('Siliconflow response received', response); // Debugging log
        return response.json();
    })
    .then(data => {
        console.log('Siliconflow data', data); // Debugging log
        if (data.success) {
            alert('Siliconflow connection successful!');
        } else {
            alert('Siliconflow connection failed: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Siliconflow fetch error', error); // Debugging log
        alert('Siliconflow connection failed: ' + error);
    });
});

document.getElementById('test-openrouter-button').addEventListener('click', function() {
    console.log('OpenRouter test button clicked');
    const apiKey = document.getElementById('openrouter-api-key').value;
    fetch('/test-openrouter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiKey: apiKey })
    })
    .then(response => {
        console.log('OpenRouter response received', response);
        return response.json();
    })
    .then(data => {
        console.log('OpenRouter data', data);
        if (data.success) {
            alert('OpenRouter connection successful!');
        } else {
            alert('OpenRouter connection failed: ' + data.error);
        }
    })
    .catch(error => {
        console.error('OpenRouter fetch error', error);
        alert('OpenRouter connection failed: ' + error);
    });
});

document.getElementById('generate-content-button').addEventListener('click', function() {
    const prompt = document.getElementById('prompt').value;
    const apiKey = document.getElementById('openrouter-api-key').value;
    const openrouterLlm = document.getElementById('openrouter-llm').value;

    fetch('/generate-content-only', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            apiKey: apiKey,
            openrouterLlm: openrouterLlm
        })
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the response is an array of slide content
        let content = "";
        data.forEach(slide => {
            content += `Title: ${slide.title}\nContent: ${slide.content}\n\n`;
        });
        document.getElementById('prompt').value = content;
    })
    .catch(error => {
        console.error('Error generating content:', error);
        alert('Error generating content: ' + error);
    });
});

document.getElementById('ppt-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const prompt = document.getElementById('prompt').value;
    const apiKey = document.getElementById('openrouter-api-key').value;
    const openrouterLlm = document.getElementById('openrouter-llm').value;
    const siliconflowLlm = document.getElementById('siliconflow-llm').value;

    // Call the backend API to generate the PPT
    fetch('/generate-ppt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            apiKey: apiKey,
            openrouterLlm: openrouterLlm,
            siliconflowLlm: siliconflowLlm
        })
    })
    .then(response => response.blob())
    .then(blob => {
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'presentation.pptx';
        a.textContent = 'Download PPT';
        document.getElementById('download-link').appendChild(a);
    });
});
