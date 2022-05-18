module.exports = {
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/exhaustive-deps": 0,
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true,
        "modules": true
      }
    }
  }
}