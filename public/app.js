const app = new Vue({
    el: '#app',
    data: {
      prompt: '',
      caseStudies: [],
      isLoading: false,
      errorMessage: '',
    },
    methods: {
      async generateCaseStudy() {
        if (this.prompt.trim() === '') {
          this.errorMessage = 'Please enter a prompt';
          return;
        }
  
        this.isLoading = true;
        this.errorMessage = '';
  
        try {
          const response = await axios.post('/generate-case-study', { prompt: this.prompt });
          const generatedText = response.data.text;
          this.caseStudies.unshift({ prompt: this.prompt, text: generatedText });
          this.prompt = '';
        } catch (error) {
          console.error('Error generating case study:', error);
          this.errorMessage = 'Failed to generate case study. Please try again.';
        } finally {
          this.isLoading = false; // Move this line inside the finally block
        }
      },
    },
  });