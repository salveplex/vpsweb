package no.salvesove.taxiportalenboard

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.view.View
import android.webkit.CookieManager
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.TextView
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.google.android.material.appbar.MaterialToolbar

class MainActivity : AppCompatActivity() {
    private lateinit var swipeRefresh: SwipeRefreshLayout
    private lateinit var webView: WebView
    private lateinit var loadingView: View
    private lateinit var errorView: View
    private lateinit var errorText: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        swipeRefresh = findViewById(R.id.swipe_refresh)
        webView = findViewById(R.id.web_view)
        loadingView = findViewById(R.id.loading_view)
        errorView = findViewById(R.id.error_view)
        errorText = findViewById(R.id.error_text)

        findViewById<MaterialToolbar>(R.id.top_app_bar).setOnMenuItemClickListener { item ->
            when (item.itemId) {
                R.id.action_reload -> {
                    reloadBoard()
                    true
                }
                else -> false
            }
        }

        swipeRefresh.setOnRefreshListener {
            webView.reload()
        }

        configureWebView()

        if (savedInstanceState == null) {
            loadBoard()
        } else {
            webView.restoreState(savedInstanceState)
            showContent()
        }

        onBackPressedDispatcher.addCallback(
            this,
            object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    if (webView.canGoBack()) {
                        webView.goBack()
                    } else {
                        finish()
                    }
                }
            }
        )
    }

    override fun onSaveInstanceState(outState: Bundle) {
        webView.saveState(outState)
        super.onSaveInstanceState(outState)
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebView() {
        CookieManager.getInstance().setAcceptCookie(true)
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true)

        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            loadWithOverviewMode = true
            useWideViewPort = true
            builtInZoomControls = false
            displayZoomControls = false
            cacheMode = WebSettings.LOAD_DEFAULT
            mediaPlaybackRequiresUserGesture = false
        }

        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                showLoading()
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                swipeRefresh.isRefreshing = false
                showContent()
            }

            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                val target = request?.url ?: return false
                if (target.scheme == "http" || target.scheme == "https") {
                    return false
                }

                startActivity(Intent(Intent.ACTION_VIEW, target))
                return true
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                if (request?.isForMainFrame == true) {
                    showError(error?.description?.toString() ?: getString(R.string.error_unknown))
                }
            }
        }
    }

    private fun loadBoard() {
        val boardUrl = BuildConfig.BOARD_URL.trim()
        if (boardUrl.isBlank() || boardUrl.contains("example.com")) {
            showError(getString(R.string.error_missing_url))
            return
        }
        webView.loadUrl(boardUrl)
    }

    private fun reloadBoard() {
        errorView.visibility = View.GONE
        loadingView.visibility = View.VISIBLE
        if (webView.url.isNullOrBlank()) {
            loadBoard()
        } else {
            webView.reload()
        }
    }

    private fun showLoading() {
        loadingView.visibility = View.VISIBLE
        errorView.visibility = View.GONE
    }

    private fun showContent() {
        loadingView.visibility = View.GONE
        errorView.visibility = View.GONE
    }

    private fun showError(message: String) {
        swipeRefresh.isRefreshing = false
        loadingView.visibility = View.GONE
        errorView.visibility = View.VISIBLE
        errorText.text = message
    }

    fun onRetryClicked(@Suppress("UNUSED_PARAMETER") view: View) {
        reloadBoard()
    }
}
