
const deleteButtons = document.querySelectorAll('.remove-button');

deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', async (event) => {
    event.preventDefault(); 
     if (event.target.classList.contains('remove-button')) {
        const blogId = event.target.getAttribute('data-blog-id');
        console.log('blog ID to delete:', blogId);
 
    const response = await fetch(`/blog/${blogId}`, {
      method: 'DELETE',
    });
    if (response.ok){
        event.target.parentElement.remove();
    } else {
        alert('Failed to delete blog');
    }
    }
  });
    
});

