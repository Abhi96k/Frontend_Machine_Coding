import { useEffect, useState } from "react";
import styles from "./styles";
function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");
      const posts = await data.json();
      setPosts(posts);
      setLoading(false);
    };
    fetchPosts();
  }, [currentPage]);

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

  const PageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pagination Example (JSONPlaceholder)</h1>

      <ul style={styles.list}>
        {currentPosts.map((post) => (
          <li key={post.id} style={styles.card}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={styles.button}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            style={{
              ...styles.pageButton,
              backgroundColor:
                currentPage === index + 1 ? "#007bff" : "#f0f0f0",
              color: currentPage === index + 1 ? "white" : "black",
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          style={styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
